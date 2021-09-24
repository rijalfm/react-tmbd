import "./Side.css";

const Side = (props) => {
    return (
        <div className="trailer">
            <div className="title">Trailer</div>
            {props.data.slice(0,5).map((item, index) => {
                return (
                    <iframe
                        style={{margin: 10}}
                        key={index}
                        width={300}
                        height={169}
                        src={`https://www.youtube.com/embed/${item.key}`}
                        title={item.name}
                        frameBorder={0}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )
            })}
        </div>
    );
};

export default Side;
