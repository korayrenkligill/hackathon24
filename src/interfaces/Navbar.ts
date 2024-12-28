export interface NavbarLinkType {
  type: "link";
  name: string;
  path: string;
  disabled?: boolean;
}

export interface NavbarDropdownType {
  type: "dropdown";
  name: string;
  links: {
    name: string;
    path: string;
    disabled?: boolean;
  }[];
}

export interface NavbarButtonType {
  type: "button";
  name: string;
  path: string;
  disabled?: boolean;
}

export type NavbarItemType =
  | NavbarLinkType
  | NavbarDropdownType
  | NavbarButtonType;
