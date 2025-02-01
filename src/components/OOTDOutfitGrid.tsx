import { OOTD } from "../types/ootd";

interface OOTDGridProps {
  ootd?: OOTD;
}

const OOTDOutfitGrid = ({ ootd }: OOTDGridProps) => {
  if (!ootd) {
    return <div className="cell-without-ootd w-full h-full bg-gray-100 rounded" />;
  }

  if (ootd.layout === "single") {
    return (
      <div className="single-outfit-grid flex justify-center items-center w-full h-full
        opacity-60 hover:opacity-100 hover:cursor-pointer
      ">
        <img src={ootd.items[0].image} alt="OOTD" className="w-full aspect-square object-cover rounded" />
      </div>
    );
  }

  if (ootd.layout === "double") {
    return (
      <div className="double-outfit-grid grid grid-cols-2 grid-rows-2 gap-1 w-full h-full
        opacity-60 hover:opacity-100 hover:cursor-pointer
      ">
        {[...ootd.items, {dummy: 2}, {dummy: 3}].map((item: Object, i) => {
          if(item.image) {
            return (
              <img key={i} src={item.image} alt="OOTD"
                className="w-full aspect-square object-cover rounded"
              />);
          } else {
            return (<div
              key={i}
              className="w-full aspect-square bg-gray-300 rounded flex items-center justify-center"
            >
              <span className="text-gray-500 text-sm">
                <img src="/icon-hanger-stroked.svg" alt="logo"
                  className="placeholder-hanger sm:w-4 w-8 lg:w-12 xl:w-16"
                />
              </span>
            </div>)
          }})}
      </div>
    );
  }

  if (ootd.layout === "four-grid") {
    return (
      <div className="four-outfit-grid grid grid-cols-2 grid-rows-2
        gap-1 w-full h-full hover:cursor-pointer
        opacity-60 hover:opacity-100
      ">
        {ootd.items.map((item, i) => (
          <img key={i} src={item.image} alt="OOTD" className="w-full aspect-square object-cover rounded" />
        ))}
      </div>
    );
  }

  if (ootd.layout === "nine-grid") {
    return (
      <div className="nine-outfit-grid 
        grid grid-cols-3 grid-rows-3 gap-1 w-full h-full
        opacity-60 hover:opacity-100 border-gray border-solid
        hover:cursor-pointer
      ">
        {ootd.items.map((item, i) => (
          <img key={i} src={item.image} alt="OOTD"
            className="w-full aspect-square
            object-cover rounded"
          />
        ))}
      </div>
    );
  }

  return null;
}

export default OOTDOutfitGrid;
