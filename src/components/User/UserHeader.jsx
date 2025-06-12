import Image from 'next/image';

const UserHeader = ({ user }) => {
    return (
        <div className="card card-body py-2 bg-transparent shadow-none">
            <div className="row">
                <div className="col-auto">
                    <div className="avatar avatar-2xl rounded-circle position-relative mt-n7 border border-gray-100 border-4">
                        <img
                            src={user?.avatar || "/assets/img/team-2.jpg"}
                            alt="profile_image"
                            className="w-100"
                        />
                    </div>
                </div>
                <div className="col-auto my-auto">
                    <div className="h-100">
                        <h3 className="mb-0 font-weight-bold">
                            {user?.name || 'Noah Mclaren'}
                        </h3>
                        <p className="mb-0">
                            {user?.email || 'noah_mclaren@mail.com'}
                        </p>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 my-sm-auto ms-sm-auto me-sm-0 mx-auto mt-3 text-sm-end">
                    <button className="btn btn-sm btn-white">Cancel</button>
                    <button className="btn btn-sm btn-dark">Save</button>
                </div>
            </div>
        </div>
    );
};

export default UserHeader;