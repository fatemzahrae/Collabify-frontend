import Link from 'next/link';

const ArticleCard = ({ article }) => {
    return (
        <div className="col-xl-4 col-md-6 mb-xl-0 mb-4">
            <div className="card card-background border-radius-xl card-background-after-none align-items-start mb-4">
                <div className="full-background bg-cover" style={{ backgroundImage: `url('${article.image}')` }}></div>
                <span className="mask bg-dark opacity-1 border-radius-sm"></span>
                <div className="card-body text-start p-3 w-100">
                    <div className="row">
                        <div className="col-12">
                            <div className="blur shadow d-flex align-items-center w-100 border-radius-md border border-white mt-8 p-3">
                                <div className="w-50">
                                    <p className="text-dark text-sm font-weight-bold mb-1">{article.author}</p>
                                    <p className="text-xs text-secondary mb-0">{article.date}</p>
                                </div>
                                <p className="text-dark text-sm font-weight-bold ms-auto">{article.category}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Link href="#">
                <h4 className="font-weight-semibold">{article.title}</h4>
            </Link>
            <p className="mb-4">{article.description}</p>
            <Link href="#" className="text-dark font-weight-semibold icon-move-right mt-auto w-100 mb-5">
                Read post
                <i className="fas fa-arrow-right-long text-sm ms-1" aria-hidden="true"></i>
            </Link>
        </div>
    );
};

export default ArticleCard;
