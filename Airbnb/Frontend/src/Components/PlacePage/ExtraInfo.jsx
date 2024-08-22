const ExtraInfo = ({ place }) => {
  return (
    <div className="flex flex-col gap-0.5 mb-5">
      <span className="text-xl font-semibold">Extra Info</span>
      <p className="text-sm text-gray-500">{place?.extraInfo}</p>
    </div>
  );
};

export default ExtraInfo;
