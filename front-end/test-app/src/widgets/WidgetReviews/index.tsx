import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Sidebar } from "../../components/Sidebar";
import { ReviewInterface } from "./widgetReviews.interface";
import "./styles.scss";

type WidgetReviewsProps = {
  reviews: ReviewInterface[];
};

const WidgetReviews: React.FC<WidgetReviewsProps> = ({ reviews }) => {
  const [initialReviews, setInitialReviews] = useState(reviews);
  const [readAllReviews, setReadAllReviews] = useState<boolean>(false);

  const toggleReadAllReviews = () => {
    setReadAllReviews(!readAllReviews);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="reviews__block d-flex flex-column">
        {!readAllReviews && initialReviews.length > 0 && (
          <div className="review">
            <div className="review__title">{initialReviews[0].name}</div>
            <div className="review__date">
              {formatDate(initialReviews[0].date)}
            </div>
            <div className="review__rating">
              {initialReviews[0].rate} out of 5
            </div>
            <div className="review__comment">{initialReviews[0].comment}</div>
          </div>
        )}

        {readAllReviews &&
          initialReviews.map((review) => (
            <div key={review.id} className="review">
              <div className="review__title">{review.name}</div>
              <div className="review__date">{formatDate(review.date)}</div>
              <div className="review__rating">{review.rate} out of 5</div>
              <div className="review__comment">{review.comment}</div>
            </div>
          ))}

        <hr />
        {!readAllReviews ? (
          <button
            className="reviews__block-button"
            onClick={() => toggleReadAllReviews()}
          >
            Read All Reviews
          </button>
        ) : (
          <button
            className="reviews__block-button"
            onClick={() => toggleReadAllReviews()}
          >
            Read Less Reviews
          </button>
        )}

        <div className="reviews__form">
          <Formik
            initialValues={{ email: "", name: "", comment: "" }}
            validate={(values) => {
              const errors: any = {};
              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={(values, { resetForm, setSubmitting }) => {
              const newReview = {
                ...values,
                id: initialReviews[initialReviews.length - 1].id + 1,
                date: new Date(),
                rate: Math.floor(Math.random() * 5) + 1,
              };
              if (readAllReviews) {
                setInitialReviews((prev) => [...prev, newReview]);
              } else {
                toggleReadAllReviews();
                setInitialReviews((prev) => [...prev, newReview]);
              }
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="review__form d-flex flex-column">
                <div className="review__form-textarea">
                  <Field
                    as="textarea"
                    placeholder="Comment"
                    type="text"
                    name="comment"
                  />
                  <ErrorMessage name="comment" component="div" />
                </div>
                <div className="review__form-inputs">
                  <Field type="email" placeholder="Email" name="email" />
                  <ErrorMessage name="email" component="div" />
                  <Field type="text" placeholder="Name" name="name" />
                  <ErrorMessage name="name" component="div" />
                </div>
                <button
                  className="review__form-button"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default WidgetReviews;
