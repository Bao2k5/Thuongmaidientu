const ReviewCard = ({ review }) => {
  return (
    <div className="border-b border-sky-100 pb-6 last:border-0">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-medium">
          {review.userName.charAt(0)}
        </div>
        <div>
          <h4 className="font-medium text-sky-900">{review.userName}</h4>
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400 text-sm">
              {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            </div>
            <span className="text-sky-500 text-sm">{review.date}</span>
          </div>
        </div>
      </div>
      <p className="text-sky-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
