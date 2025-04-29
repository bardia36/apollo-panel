import { Template } from "@/types/templates";

type Props = {
  template: Template;
};

export const ExistedTemplateDetails = ({ template }: Props) => {
  return (
    <div>
      Existed TEMPLATE DETAIL
      <div>{template._id}</div>
    </div>
  );
};
