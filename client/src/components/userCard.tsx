type PropsType = {
  title: string;
  info: string;
};

export default function UserCard({ title, info }: PropsType) {
  return (
    <div>
      <h3>{title}</h3>
      <h5>{info}</h5>
    </div>
  );
}
