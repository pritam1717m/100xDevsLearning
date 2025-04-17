import { useSuspenseQuery } from "@tanstack/react-query";
import "./App.css";
import { fetchPhotos } from "./queries/fetchPhotos";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

function App() {
  const suspensePhotos = useSuspenseQuery(fetchPhotos());

  // const scrollRef = useRef<HTMLDivElement>(null);

  // const virtulizer = useVirtualizer({
  //   count: suspensePhotos.data.length,
  //   estimateSize: () => 120,
  //   getScrollElement: () => scrollRef.current,
  // });

  const virtulizer = useWindowVirtualizer({
    count: suspensePhotos.data.length,
    estimateSize: () => 200,
  });

  const virtualItems = virtulizer.getVirtualItems();

  return (
    <div
      // ref={scrollRef}
      style={{ width: "90dvw", overflow: "auto" }} //height: "80dvw" -> this is not required for window virtualizer
    >
      <div
        style={{
          position: "relative",
          height: `${virtulizer.getTotalSize()}px`,
        }}
      >
        <div
          style={{
            width: "100%",
            position: "absolute",
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
            top: "0",
            left: "0",
          }}
        >
          {virtualItems.map((vItem) => {
            const photo = suspensePhotos.data[vItem.index];
            return (
              <li
                key={vItem.key}
                data-index={vItem.index}
                ref={virtulizer.measureElement}
                style={{
                  margin: "20px 0",
                  padding: "20px",
                  backgroundColor: "green",
                  borderRadius: "5px",
                }}
              >
                <img src={photo.thumbnailUrl} alt={photo.title} />
              </li>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
