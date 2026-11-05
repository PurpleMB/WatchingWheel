import "./EpisodeCard.css"
import type { Episode } from "../api/tvMaze.types"

interface EpisodeCardProps {
  episode: Episode
}

function pad(num: number) {
    return num.toString().padStart(2, "0");
}

function EpisodeCard({ episode }: EpisodeCardProps) {
    const imageUrl = episode.image?.original ?? episode.image?.medium ?? episode.show.image?.original ?? episode.show.image?.medium ?? "";

    return (
        <article className="episode-card">
            <div className="episode-card-info">
                <h2 className="episode-card-title">
                    {episode.name}
                </h2>
                <p className="episode-card-show">
                    {episode.show.name}
                </p>
                <p className="episode-card-code">
                  Season {episode.season} Episode {episode.number}
                  <span className="episode-card-code-badge">
                    S{pad(episode.season)} E{pad(episode.number)}
                  </span>
                </p>
                {episode.summary && (
                    <div 
                        className="episode-card-summary" dangerouslySetInnerHTML={{ __html: episode.summary }} 
                    />
                )}
            </div>

            <div className="episode-card-image">
                {imageUrl 
                    ? <img src={imageUrl} alt={`${episode.show.name} - ${episode.name}`} />
                    : <div className="episode-card-image-placeholder">No image available</div>
                }
            </div>
        </article>
    );
}

export default EpisodeCard;