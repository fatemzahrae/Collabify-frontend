import Link from 'next/link';
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import ArticleCard from './ArticleCard';

const LastArticles = () => {
    const articles = [
        {
            title: 'Best strategy games',
            description: 'As Uber works through a huge amount of internal management turmoil.',
            author: 'Sara Lamalo',
            date: '20 Jul 2022',
            category: 'Growth',
            image: '/img-8.jpg'
        },
        {
            title: 'Don\'t be afraid to be wrong',
            description: 'As Uber works through a huge amount of internal management turmoil.',
            author: 'Charles Deluvio',
            date: '17 Jul 2022',
            category: 'Education',
            image: '/img-9.jpg'
        },
        {
            title: 'How to lead your team efficiently',
            description: 'As Uber works through a huge amount of internal management turmoil.',
            author: 'Maria Spark',
            date: '30 Jul 2022',
            category: 'Management',
            image: '/img-2.jpg'
        }
    ];

    return (
        <div className="card shadow-xs border mb-4 pb-3">
            <div className="card-header pb-0 p-3">
                <h6 className="mb-0 font-weight-semibold text-lg">Last articles</h6>
                <p className="text-sm mb-1">Here you will find the latest articles.</p>
            </div>
            <div className="card-body p-3">
                <div className="row">
                    {articles.map((article, index) => (
                        <ArticleCard key={index} article={article} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LastArticles;