import * as PropTypes from "prop-types"; // Import PropTypes để kiểm tra kiểu dữ liệu của props
import React from "react"; // Import React

export default function ModalStudent(props) { // Khởi tạo component ModalStudent với các props được truyền vào
    return <div className="modal-body"> {/* Phần body của modal */}
        <form onSubmit={props.onSubmit}> {/* Form chứa các trường nhập liệu */}
            <div className="mb-3"> {/* Thẻ div chứa input của trường Name */}
                <label htmlFor="name" className="form-label">Name</label> {/* Label cho trường Name */}
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Name"
                    value={props.formData.name} // Lấy giá trị của trường Name từ formData
                    onChange={props.onChange} // Gọi hàm onChange khi người dùng thay đổi nội dung input
                />
            </div>
            <div className="mb-3"> {/* Thẻ div chứa input của trường Phone */}
                <label htmlFor="phone" className="form-label">Phone</label> {/* Label cho trường Phone */}
                <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={props.formData.phone} // Lấy giá trị của trường Phone từ formData
                    onChange={props.onChange} // Gọi hàm onChange khi người dùng thay đổi nội dung input
                />
            </div>
            <div className="mb-3"> {/* Thẻ div chứa input của trường Email */}
                <label htmlFor="email" className="form-label">Email</label> {/* Label cho trường Email */}
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                    value={props.formData.email} // Lấy giá trị của trường Email từ formData
                    onChange={props.onChange} // Gọi hàm onChange khi người dùng thay đổi nội dung input
                />
            </div>
            <button type="submit" className="btn btn-primary">{props.editing ? 'Cập nhật' : 'Thêm mới'}</button> {/* Nút submit với nội dung khác nhau dựa trên trạng thái */}
        </form>
    </div>;
}

ModalStudent.propTypes = { // Định nghĩa kiểu dữ liệu của các props
    onSubmit: PropTypes.func, // onSubmit là một function
    formData: PropTypes.shape({ // formData là một object với 3 thuộc tính: name, phone, email
        name: PropTypes.string,
        phone: PropTypes.string,
        email: PropTypes.string
    }),
    onChange: PropTypes.func, // onChange là một function
    editing: PropTypes.bool // editing là một boolean
};
