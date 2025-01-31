import { OOTD } from "../types/ootd";

interface OOTDGridProps {
  ootd?: OOTD;
}

const SingleOutfitGrid = ({ ootd }: OOTDGridProps) => {
  if (!ootd) {
    return <div className="w-full h-24 bg-gray-100 rounded" />;
  }

  if (ootd.layout === "single") {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <img src={ootd.items[0].image} alt="OOTD" className="w-full aspect-square object-cover rounded" />
      </div>
    );
  }

  if (ootd.layout === "double") {
    return (
      <div className="grid grid-cols-2 gap-1 w-full h-full">
        {ootd.items.map((item, i) => (
          <img key={i} src={item.image} alt="OOTD" className="w-full aspect-square object-cover rounded" />
        ))}
      </div>
    );
  }

  if (ootd.layout === "four-grid") {
    return (
      <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full">
        {ootd.items.map((item, i) => (
          <img key={i} src={item.image} alt="OOTD" className="w-full aspect-square object-cover rounded" />
        ))}
      </div>
    );
  }

  if (ootd.layout === "nine-grid") {
    return (
      <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
        {ootd.items.map((item, i) => (
          <img key={i} src={item.image} alt="OOTD" className="w-full aspect-square object-cover rounded" />
        ))}
      </div>
    );
  }

  return null;
}

export default SingleOutfitGrid;
