type Props = {
  params: {
    id?: string;
  };
};

const DocumentListFormById = async ({ params }: Props) => {
  const id = (await params).id;

  return <div>DocumentListById : {id}</div>;
};

export default DocumentListFormById;
