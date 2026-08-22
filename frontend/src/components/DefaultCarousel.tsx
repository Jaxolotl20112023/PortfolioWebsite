import Carousel from "react-bootstrap/Carousel";
import "../css/DefaultCarousel.css";

interface Props {
  imgs: string[];
  title?: string;
  root?: string;
}

const DefaultCarousel = ({ imgs, title, root }: Props) => {
  return (
    <div id="carousel" className="rounded-4 w-75 h-75">
      <center>
        <h2 className="text-white">{title}</h2>
        <br />
        <Carousel>
          {imgs.map((img) => (
            <Carousel.Item>
              <img src={`./${root}/${img}`} alt="" />
            </Carousel.Item>
          ))}
        </Carousel>
      </center>
    </div>
  );
};

export default DefaultCarousel;
