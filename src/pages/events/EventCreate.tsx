import {
  Button,
  FileButton,
  Group,
  Input,
  MultiSelect,
  NumberInput,
  Select,
  Stepper,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useRef, useState } from "react";
import { RichTextEditor, Link } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import Highlight from "@tiptap/extension-highlight";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Superscript from "@tiptap/extension-superscript";
import SubScript from "@tiptap/extension-subscript";
import { DatePickerInput } from "@mantine/dates";
import { MdFileUpload } from "react-icons/md";
import { useIntl } from "react-intl";
import {
  addBadge,
  addEvent,
  EventType,
  User,
} from "../../interfaces/GlobalTypes";
import { v4 as uuidv4 } from "uuid";
import { convertFileToBase64 } from "../../utils/imageToBase64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const options = [
  "Atölye Çalışmaları",
  "Seminerler ve Konferanslar",
  "Sosyal Sorumluluk Projeleri",
  "Spor Etkinlikleri",
  "Kültürel Geziler",
  "Networking Etkinlikleri",
  "Sanat ve Yaratıcılık Atölyeleri",
  "Müzik ve Eğlence",
  "Lise Öğrencileri",
  "Üniversite Öğrencileri",
  "Yeni Mezunlar",
  "Ücretsiz",
  "Ücretli",
];

const EventCreate = () => {
  const resetRef = useRef<() => void>(null);
  const intl = useIntl();
  const navigation = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const [address, setAddress] = useState("");

  const [value, setValue] = useState<Date | null>(null);

  const [selectedType, setSelectedType] = useState<string | null>("duyuru");

  const [link, setLink] = useState("");
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
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

  const AddBadge = () => {
    const tempId = uuidv4();
    const resp = addBadge({
      id: tempId,
      name: name,
      emoji: icon,
      point: Number(point),
      details: description,
      eventType: selectedType as "duyuru" | "katılım" | "bağlantı",
      createdAt: new Date().toISOString(),
    });
    if (!resp.isOk) {
      toast.error(resp.message);
      return;
    }
    AddEvent(tempId);
  };

  const AddEvent = async (badgeId: string) => {
    const user = JSON.parse(localStorage.getItem("lu") || "{}");
    if (!user.id) return;

    const image = file ? await convertFileToBase64(file) : "";
    const resp = addEvent({
      id: uuidv4(),
      title: title,
      description: content,
      organizer: user.id,
      type: selectedType as "duyuru" | "katılım" | "bağlantı",
      url: link,
      badge: badgeId,
      participants: [],
      qrCode: "",
      status: "beklemede",
      createdAt: new Date().toISOString(),
      image: image as string,
      categories: selectedCategory as EventType[],
      date: value?.toISOString() || new Date().toISOString(),
    });

    if (!resp.isOk) {
      toast.error(resp.message);
      return;
    }
    navigation("/etkinlik-listesi");
  };

  const nextStep = () => {
    setActive((current) => (current < 3 ? current + 1 : current));
  };
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  return (
    <div className="container mx-auto px-4 my-8">
      <Stepper active={active}>
        <Stepper.Step
          label={intl.formatMessage({ id: "event.create.step1.label" })}
          description={intl.formatMessage({ id: "event.create.step1.desc" })}
        >
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
            <MultiSelect
              radius={"md"}
              size="md"
              label="Kategoriler"
              data={options}
              value={selectedCategory}
              onChange={setSelectedCategory}
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
        <Stepper.Step
          label={intl.formatMessage({ id: "event.create.step2.label" })}
          description={intl.formatMessage({ id: "event.create.step2.desc" })}
        >
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
              required
              onChange={setValue}
            />
            <Select
              label="Your favorite library"
              placeholder="Pick value"
              data={["duyuru", "bağlantı", "katılım"]}
              value={selectedType}
              onChange={setSelectedType}
              radius={"md"}
              required
              size="md"
            />
            {selectedType === "bağlantı" && (
              <TextInput
                label="Link"
                radius={"md"}
                value={link}
                className="resize-none"
                onChange={(e) => setLink(e.target.value)}
                size="md"
                required
              />
            )}

            <div>
              <FileButton
                resetRef={resetRef}
                onChange={setFile}
                accept="image/png,image/jpeg"
              >
                {(props) => (
                  <Button
                    leftSection={<MdFileUpload />}
                    size="md"
                    radius="md"
                    {...props}
                    className="mt-4"
                  >
                    Upload image
                  </Button>
                )}
              </FileButton>
              {file && <p>Picked file: {file.name}</p>}
            </div>
            <Button type="submit" disabled={!file} className="mt-4">
              İleri
            </Button>
          </form>
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Get full access">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              nextStep();
              AddBadge();
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
              label="Rozet İkonu"
              placeholder="🚀"
              radius={"md"}
              size="md"
              required
              maxLength={5}
              onChange={(e) => setIcon(e.target.value)}
              value={icon}
            />
            <TextInput
              label="Description"
              radius={"md"}
              size="md"
              required
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />

            <TextInput
              type="number"
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
