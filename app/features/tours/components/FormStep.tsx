import { Title } from '~/shared/components/Title';

type FormStepProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function FormStep({
  title,
  description,
  children,
}: FormStepProps) {
  return (
    <div className="pt-5">
      <Title type="h3">{title}</Title>
      <Title type="h2" className="pb-15">
        {description}
      </Title>
      {children}
    </div>
  );
}
