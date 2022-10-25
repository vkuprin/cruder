import { FC, ReactElement, ReactNode } from 'react';
import CheckboxContainer from '../../containers/CheckboxContainer';
import InputContainer from '../../containers/InputContainer';
import SelectContainer from '../../containers/SelectContainer';

export const containerTypes = {
  Select: 'select',
  Radio: 'radio',
  Checkbox: 'checkbox',
  Chip: 'chip',
  Input: 'input',
  Switch: 'switch',
  Upload: 'file',
};

interface ContainerProps {
    // ToDo add types global container interface
    data: ReactNode | any;
}

interface LayoutProps {
  customData: JSX.Element;
  type: string;
  name: string;
}

const RenderLayout: FC<ContainerProps> = ({ data }) => data?.map((layoutProps: LayoutProps) => {
  switch (layoutProps.type) {
    case containerTypes.Checkbox:
      return (
        <CheckboxContainer key={layoutProps.name} {...layoutProps} />
      );
    case containerTypes.Input:
      return (
        <InputContainer key={layoutProps.name} {...layoutProps} />
      );
    case containerTypes.Select:
      return (
        <SelectContainer key={layoutProps.name} {...layoutProps} />
      );
    default:
      return layoutProps.customData || null;
  }
});

export default RenderLayout;
