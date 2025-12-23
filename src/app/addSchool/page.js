"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const image = watch("image");

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const formData = new FormData();

      // Append all form fields
      Object.keys(data).forEach((key) => {
        if (key === "image" && data[key] && data[key][0]) {
          formData.append(key, data[key][0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.status === 200) {
        setSuccessMessage("School added successfully!");
        reset();
        setPreviewImage(null);

        setTimeout(() => {
          router.push("/showSchools");
        }, 1500);
      } else {
        alert(result?.error || "Failed to add school");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1
          style={{ textAlign: "center", marginBottom: "2rem", color: "#333" }}
        >
          Add New School
        </h1>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* School Name */}
          <div className="form-group">
            <label htmlFor="name">School Name *</label>
            <input
              type="text"
              id="name"
              {...register("name", {
                required: "School name is required",
                minLength: {
                  value: 3,
                  message: "School name must be at least 3 characters long",
                },
              })}
              placeholder="Enter school name"
            />
            {errors.name && (
              <span className="error-message">{errors.name.message}</span>
            )}
          </div>

          {/* Address */}
          <div className="form-group">
            <label htmlFor="address">Address *</label>
            <textarea
              id="address"
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters long",
                },
              })}
              placeholder="Enter school address"
            />
            {errors.address && (
              <span className="error-message">{errors.address.message}</span>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor="city">City *</label>
            <input
              type="text"
              id="city"
              {...register("city", {
                required: "City is required",
                pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "City name should contain only letters and spaces",
                },
              })}
              placeholder="Enter city name"
            />
            {errors.city && (
              <span className="error-message">{errors.city.message}</span>
            )}
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <select
              id="state"
              {...register("state", { required: "State is required" })}
            >
              <option value="">Select State</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
              <option value="CA">California</option>
              <option value="CO">Colorado</option>
              <option value="CT">Connecticut</option>
              <option value="DE">Delaware</option>
              <option value="FL">Florida</option>
              <option value="GA">Georgia</option>
              <option value="HI">Hawaii</option>
              <option value="ID">Idaho</option>
              <option value="IL">Illinois</option>
              <option value="IN">Indiana</option>
              <option value="IA">Iowa</option>
              <option value="KS">Kansas</option>
              <option value="KY">Kentucky</option>
              <option value="LA">Louisiana</option>
              <option value="ME">Maine</option>
              <option value="MD">Maryland</option>
              <option value="MA">Massachusetts</option>
              <option value="MI">Michigan</option>
              <option value="MN">Minnesota</option>
              <option value="MS">Mississippi</option>
              <option value="MO">Missouri</option>
              <option value="MT">Montana</option>
              <option value="NE">Nebraska</option>
              <option value="NV">Nevada</option>
              <option value="NH">New Hampshire</option>
              <option value="NJ">New Jersey</option>
              <option value="NM">New Mexico</option>
              <option value="NY">New York</option>
              <option value="NC">North Carolina</option>
              <option value="ND">North Dakota</option>
              <option value="OH">Ohio</option>
              <option value="OK">Oklahoma</option>
              <option value="OR">Oregon</option>
              <option value="PA">Pennsylvania</option>
              <option value="RI">Rhode Island</option>
              <option value="SC">South Carolina</option>
              <option value="SD">South Dakota</option>
              <option value="TN">Tennessee</option>
              <option value="TX">Texas</option>
              <option value="UT">Utah</option>
              <option value="VT">Vermont</option>
              <option value="VA">Virginia</option>
              <option value="WA">Washington</option>
              <option value="WV">West Virginia</option>
              <option value="WI">Wisconsin</option>
              <option value="WY">Wyoming</option>
            </select>
            {errors.state && (
              <span className="error-message">{errors.state.message}</span>
            )}
          </div>

          {/* Contact Number */}
          <div className="form-group">
            <label htmlFor="contact">Contact Number *</label>
            <input
              type="tel"
              id="contact"
              {...register("contact", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Contact number must be exactly 10 digits",
                },
              })}
              placeholder="Enter 10-digit contact number"
              maxLength="10"
            />
            {errors.contact && (
              <span className="error-message">{errors.contact.message}</span>
            )}
          </div>

          {/* Email ID */}
          <div className="form-group">
            <label htmlFor="email_id">Email ID *</label>
            <input
              type="email"
              id="email_id"
              {...register("email_id", {
                required: "Email ID is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              placeholder="Enter email address"
            />
            {errors.email_id && (
              <span className="error-message">{errors.email_id.message}</span>
            )}
          </div>

          {/* Image Upload */}
          <div className="form-group">
            <label htmlFor="image">School Image *</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              {...register("image", {
                required: "School image is required",
              })}
              onChange={handleImageChange}
            />
            {errors.image && (
              <span className="error-message">{errors.image.message}</span>
            )}

            {/* Image Preview */}
            {previewImage && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={previewImage}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            style={{ width: "100%" }}
          >
            {isSubmitting ? "Adding School..." : "Add School"}
          </button>
        </form>
      </div>
    </div>
  );
}
