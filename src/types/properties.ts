interface INotionPropertyDefault {
  id: string,
  type: string,
}

interface INotionPropertyRichTextItem {
  type: string,
  text: {
    content: string,
    link?: string,
  },
  annotations: {
    bold: boolean,
    italic: boolean,
    strikethrough: boolean,
    underline: boolean,
    code: boolean,
    color: string,
  },
  plain_text: string,
  href?: string,
}

export interface INotionPropertyTitle extends INotionPropertyDefault {
  title?: INotionPropertyRichTextItem[],
}

export interface INotionPropertyRichText extends INotionPropertyDefault {
  rich_text?: INotionPropertyRichTextItem[],
}

export interface INotionPropertySelectItem {
  id: string,
  name: string,
  color: string,
}

export interface INotionPropertySelect extends INotionPropertyDefault {
  select?: INotionPropertySelectItem,
}

export interface INotionPropertyMultiSelect extends INotionPropertyDefault {
  multi_select: INotionPropertySelectItem[],
}

export interface INotionPropertyCreatedTime extends INotionPropertyDefault {
  created_time: string,
}
export interface INotionPropertyLastEditedTime extends INotionPropertyDefault {
  last_edited_time: string,
}
