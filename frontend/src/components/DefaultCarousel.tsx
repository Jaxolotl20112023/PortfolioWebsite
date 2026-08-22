import Carousel from "react-bootstrap/Carousel";
import "../css/DefaultCarousel.css";

interface Props {
  imgs: string[];
  title?: string;
}

const DefaultCarousel = ({ imgs, title }: Props) => {
  return (
    <div id="carousel" className="rounded-4 w-50 h-75">
      <center>
        <h2 className="text-white">{title}</h2>
        <Carousel>
          {imgs.map((img) => (
            <Carousel.Item>
              <img src={`./${img}`} alt="" />
            </Carousel.Item>
          ))}
        </Carousel>
      </center>
    </div>
  );
};

export default DefaultCarousel;
