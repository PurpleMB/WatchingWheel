import type { Show } from "../api/tvMaze.types";

interface ShowButtonProps {
    show: Show;
    onSelect?: (show: Show) => void;
}

function ShowButton({ show, onSelect }: ShowButtonProps) {
    return (
        <button type="button" onClick={() => onSelect?.(show)}>
            {show.image?.medium && <img src={show.image.medium} alt={show.name} />}
            <span>
                {show.name}
            </span>
        </button>
    );
}

export default ShowButton;