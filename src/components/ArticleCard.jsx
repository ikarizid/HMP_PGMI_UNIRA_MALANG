import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import './ArticleCard.css';

export default function ArticleCard({ article, featured = false }) {
  return (
    <Link
      to={`/berita/${article.slug}`}
      className={`article-card glass-card ${featured ? 'article-card--featured' : ''}`}
      id={`article-${article.id}`}
    >
      <div className="article-card__image">
        <img src={article.image} alt={article.title} loading="lazy" />
        <span className="article-card__cat badge badge-primary">{article.category}</span>
      </div>
      <div className="article-card__content">
        <h3 className="article-card__title">{article.title}</h3>
        <p className="article-card__excerpt">{article.excerpt}</p>
        <div className="article-card__footer">
          <div className="article-card__meta">
            <span><User size={13} /> {article.author}</span>
            <span><Clock size={13} /> {article.readTime}</span>
          </div>
          <span className="article-card__link">
            Baca <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
