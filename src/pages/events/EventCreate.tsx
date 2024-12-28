import {
  Button,
  FileButton,
  Group,
  Input,
  NumberInput,
  Select,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { DatePickerInput } from "@mantine/dates";
import axios from "../../utils/axiosConfig";
import { ApiUrls } from "../../api/apiUrls";
import { toast } from "react-toastify";
import { url } from "inspector";
import { useAtomValue } from "jotai";
import userAtom from "../../store/User";

const EventCreate = () => {
  const user = useAtomValue(userAtom);
  const resetRef = useRef<() => void>(null);
  const [file, setFile] = useState<File | null>(null);
  const [badge, setBadge] = useState<File | null>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [address, setAddress] = useState("");

  const [value, setValue] = useState<Date | null>(null);

  const [selectedType, setSelectedType] = useState<string | null>(
    "Bilgilendirme"
  );

  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [point, setPoint] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Superscript,
      SubScript,
      Highlight,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    content,
  });

  const [active, setActive] = useState(0);

  const fileUpload = async (_file: File) => {
    if (!_file) {
      console.error("Dosya seçilmedi.");
      return;
    }

    const formData = new FormData();
    formData.append("file", _file); // `file` inputtan gelen dosya olmalı

    try {
      const response = await axios
        .post(ApiUrls.fileUpload.fileUpload, formData, {
          headers: {
            accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })
        .then(async (res) => {
          return res.data;
        });
      return response._id;
    } catch (error) {
      console.error("Yükleme Hatası:", error);
    }
  };

  const createEvent = async () => {
    let badgeResp = undefined;
    if (badge) badgeResp = await fileUpload(badge);

    if (!badgeResp) toast.error("Badge yükleme hatası");

    const badgeResponse = await axios.post(ApiUrls.badges.badges, {
      name,
      description,
      point: Number(point),
      icon: badgeResp,
    });

    await axios.post(ApiUrls.events.events, {
      title,
      description,
      date: value,
      location: address,
      badge: badgeResponse.data._id,
      url: link ?? "",
      organizer: user?._id,
      ...(file && { image: await fileUpload(file) }),
    });
  };

  useEffect(() => {
    if (active === 3) {
      createEvent();
    }
  }, [active]);

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="container mx-auto px-4 my-8">
      <Stepper active={active} onStepClick={setActive}>
        <Stepper.Step label="First step" description="Create an account">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            className="flex flex-col gap-2"
          >
            <TextInput
              label="Başlık"
              radius={"md"}
              size="md"
              required
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Input.Label htmlFor="content" size="md" required>
              Content
            </Input.Label>
            <RichTextEditor editor={editor} id="content">
              <RichTextEditor.Toolbar sticky stickyOffset={60}>
                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Bold />
                  <RichTextEditor.Italic />
                  <RichTextEditor.Underline />
                  <RichTextEditor.Strikethrough />
                  <RichTextEditor.ClearFormatting />
                  <RichTextEditor.Highlight />
                  <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.H1 />
                  <RichTextEditor.H2 />
                  <RichTextEditor.H3 />
                  <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Blockquote />
                  <RichTextEditor.Hr />
                  <RichTextEditor.BulletList />
                  <RichTextEditor.OrderedList />
                  <RichTextEditor.Subscript />
                  <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Link />
                  <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.AlignLeft />
                  <RichTextEditor.AlignCenter />
                  <RichTextEditor.AlignJustify />
                  <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                  <RichTextEditor.Undo />
                  <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
              </RichTextEditor.Toolbar>

              <RichTextEditor.Content />
            </RichTextEditor>
            <Textarea
              label="Adres"
              radius={"md"}
              size="md"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
            />
            <Button type="submit">İleri</Button>
          </form>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Verify email">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            className="flex flex-col gap-2"
          >
            <DatePickerInput
              label="Etkinlik Tarihi"
              radius={"md"}
              size="md"
              value={value}
              onChange={setValue}
            />
            <Select
              label="Your favorite library"
              placeholder="Pick value"
              data={["Bilgilendirme", "Yönlendirmeli", "Katılım Sağlanan"]}
              value={selectedType}
              onChange={setSelectedType}
              radius={"md"}
              size="md"
            />
            {selectedType === "Yönlendirmeli" && (
              <TextInput
                label="Link"
                radius={"md"}
                value={link}
                onChange={(e) => setLink(e.target.value)}
                size="md"
                required
              />
            )}

            {file && <p>Picked file: {file.name}</p>}
            <FileButton
              resetRef={resetRef}
              onChange={setFile}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <Button type="submit">İleri</Button>
          </form>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
            }}
            className="flex flex-col gap-2"
          >
            <TextInput
              label="Rozet Adı"
              radius={"md"}
              size="md"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
            <TextInput
              label="Description"
              radius={"md"}
              size="md"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
            {badge && <p>Picked file: {badge.name}</p>}
            <FileButton
              resetRef={resetRef}
              onChange={setBadge}
              accept="image/png,image/jpeg"
            >
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <TextInput
              label="Puan"
              radius={"md"}
              size="md"
              required
              onChange={(e: any) => setPoint(e.target.value)}
              value={point}
            />
            <Button type="submit">İleri</Button>
          </form>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>
    </div>
  );
};

export default EventCreate;
