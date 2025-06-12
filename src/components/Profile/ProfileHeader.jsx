import Image from "next/image";
import Link from "next/link";
import team2 from "@/assets/img/team-2.jpg";
import "@/assets/css/nucleo-icons.css";
import "@/assets/css/nucleo-svg.css";
import "@/assets/css/corporate-ui-dashboard.css?v=1.0.0";
import { userAPI } from "@/api/api";

import React from "react";

const ProfileHeader = ({ user }) => {
  return (
    <>
      {/* Cover Image */}
      <div
        className="pt-7 pb-6 bg-cover"
        style={{
          backgroundImage: `url("/header-orange-purple.jpg")`,
          backgroundPosition: "bottom",
        }}
      />

      {/* Profile Card */}
      <div className="container">
        <div className="card card-body py-2 bg-transparent shadow-none">
          <div className="row">
            {/* Avatar */}
            <div className="col-auto">
              <div className="avatar avatar-2xl rounded-circle position-relative mt-n7 border border-gray-100 border-4">
                <Image
                  src={team2}
                  alt="profile_image"
                  width={128}
                  height={148}
                  className="w-100"
                />
              </div>
            </div>

            {/* User Info */}
            <div className="col-auto my-auto">
              <div className="h-100">
                <h3 className="mb-0 font-weight-bold">
                  {user.firstname} {user.lastname}
                </h3>
                <p className="mb-0">{user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3 text-sm-end">
              <button className="btn btn-sm btn-white">Cancel</button>
              <button className="btn btn-sm btn-dark ms-2">Save</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileHeader;
