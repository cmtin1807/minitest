import React, { useState } from 'react';
import ModalStudent from "./ModalStudent";

const StudentTable = () => { // Khởi tạo component StudentTable
    const [students, setStudents] = useState([ // Khởi tạo state `students` để lưu danh sách sinh viên
        { name: "Nguyễn Đức Thảo Nguyên", phone: "0982775131", email: "Nguyen@gamil.com" }, // Thông tin sinh viên thứ nhất
        { name: "Đỗ Trung Quyết", phone: "0982775132", email: "Quyet@gamil.com" },
        { name: "Đặng Lê Thành Công", phone: "09876543210", email: "Cong@gamil.com" },
        { name: "Hoàng Minh Hiếu", phone: "09876543210", email: "Cong@gamil.com" },
        { name: "Lương Triều Đình", phone: "09876543210", email: "Cong@gamil.com" },
        { name: "Trần Đình Hiếu", phone: "09876543210", email: "Cong@gamil.com" },
        { name: "Lưu Như Yên", phone: "09876543210", email: "Cong@gamil.com" },
        { name: "Cố Thần", phone: "09876543210", email: "Hieu@gamil.com" },
        { name: "Thiên Tôn", phone: "09876543210", email: "Hieu@gamil.com" }
    ]);

    const [formData, setFormData] = useState({ name: '', phone: '', email: '' }); // Khởi tạo state `formData` để lưu thông tin form khi nhập
    const [isEditing, setIsEditing] = useState(false); // Khởi tạo state `isEditing` để xác định đang chỉnh sửa hay thêm mới sinh viên
    const [editingIndex, setEditingIndex] = useState(null); // Khởi tạo state `editingIndex` để lưu chỉ số sinh viên đang chỉnh sửa

    const handleInputChange = (e) => { // Hàm xử lý khi có thay đổi input form
        setFormData({
            ...formData, // Giữ nguyên các giá trị cũ
            [e.target.name]: e.target.value, // Cập nhật giá trị theo tên của input (name, phone, email)
        });
    };


    const handleSubmit = (e) => { // Hàm xử lý khi submit form
        e.preventDefault(); // Ngăn không cho trang reload khi submit

        if (!formData.name || !formData.phone || !formData.email) { // Kiểm tra nếu các trường chưa được nhập đầy đủ
            alert('Vui lòng nhập đầy đủ thông tin!'); // Hiển thị thông báo nếu thiếu thông tin
            return;
        }
        if (!/^\d+$/.test(formData.phone)) { // Kiểm tra nếu trường phone không phải số
            alert('Trường Phone chỉ được nhập số!'); // Hiển thị cảnh báo nếu số điện thoại không hợp lệ
            return;
        }
        if (isEditing) { // Nếu đang ở trạng thái chỉnh sửa
            const updatedStudents = students.map((student, index) => // Tạo danh sách sinh viên mới với thông tin được cập nhật
                index === editingIndex ? formData : student // Cập nhật sinh viên tại vị trí đang chỉnh sửa
            );
            setStudents(updatedStudents); // Cập nhật lại danh sách sinh viên
            setIsEditing(false); // Chuyển trạng thái sang không chỉnh sửa
            setEditingIndex(null); // Reset lại index chỉnh sửa
        } else {
            setStudents([...students, formData]); // Nếu là thêm mới, thêm sinh viên vào danh sách
        }
        setFormData({ name: '', phone: '', email: '' }); // Reset lại form sau khi xử lý
    };

    const handleEdit = (index) => { // Hàm xử lý khi nhấn nút chỉnh sửa
        setFormData(students[index]); // Lấy thông tin sinh viên cần chỉnh sửa đưa vào form
        setIsEditing(true); // Chuyển trạng thái thành chỉnh sửa
        setEditingIndex(index); // Lưu chỉ số sinh viên đang được chỉnh sửa
    };

    const handleDelete = (index) => { // Hàm xử lý khi nhấn nút xóa sinh viên
        setStudents(students.filter((_, i) => i !== index)); // Lọc bỏ sinh viên theo index và cập nhật lại danh sách
    };

    const [searchTerm, setSearchTerm] = useState(''); // State cho tìm kiếm
    const [sortAscending, setSortAscending] = useState(true); // State cho sắp xếp
    const [currentPage, setCurrentPage] = useState(1); // State cho phân trang
    const itemsPerPage = 5; // Số bản ghi mỗi trang

    const handleSearchChange = (e) => { // Hàm xử lý thay đổi input tìm kiếm
        setSearchTerm(e.target.value);
    };

    const filteredStudents = students
        .filter(student => // Lọc danh sách sinh viên dựa trên từ khóa tìm kiếm
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Kiểm tra nếu tên sinh viên (viết thường) chứa từ khóa tìm kiếm (viết thường)
            student.phone.includes(searchTerm) || // Kiểm tra nếu số điện thoại chứa từ khóa tìm kiếm
            student.email.toLowerCase().includes(searchTerm.toLowerCase()) // Kiểm tra nếu email sinh viên (viết thường) chứa từ khóa tìm kiếm (viết thường)
        )
        .sort((a, b) => { // Sắp xếp danh sách sinh viên sau khi lọc
            if (sortAscending) { // Nếu `sortAscending` là true, sắp xếp theo thứ tự tăng dần
                return a.name.localeCompare(b.name); // So sánh tên của sinh viên a và b theo bảng chữ cái
            } else { // Nếu `sortAscending` là false, sắp xếp theo thứ tự giảm dần
                return b.name.localeCompare(a.name); // So sánh tên sinh viên b và a theo bảng chữ cái (ngược lại)
            }
        });

    // Tính toán phân trang
// Tính toán chỉ số của phần tử cuối cùng trong trang hiện tại
    const indexOfLastItem = currentPage * itemsPerPage;
// Ví dụ: Nếu currentPage = 2 và itemsPerPage = 5 thì indexOfLastItem = 10

// Tính toán chỉ số của phần tử đầu tiên trong trang hiện tại
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// Ví dụ: Nếu indexOfLastItem = 10 thì indexOfFirstItem = 10 - 5 = 5

// Lấy danh sách sinh viên đã lọc và cắt nó thành một mảng mới chỉ chứa các sinh viên trong trang hiện tại
    const currentItems = filteredStudents.slice(indexOfFirstItem, indexOfLastItem);
// Ví dụ: Nếu filteredStudents có 15 sinh viên, và indexOfFirstItem = 5, indexOfLastItem = 10,
// thì currentItems sẽ chứa các sinh viên từ chỉ số 5 đến 9 (tổng cộng 5 sinh viên).


    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container">
            <div className="table-wrapper">
                <div className="table-title">
                    <div className="row">
                        <div className="col-sm-6">
                            <h2>Danh sách <b>Sinh viên</b></h2>
                        </div>
                        <div className="col-sm-6">
                            <button
                                className="btn btn-primary mb-3"
                                data-bs-toggle="modal"
                                data-bs-target="#studentModal"
                                onClick={() => {
                                    setFormData({ name: '', phone: '', email: '' });
                                    setIsEditing(false);
                                }}
                            >
                                <i className="material-icons">&#xE147;</i> <span>Thêm mới sinh viên</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Ô tìm kiếm */}
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Tìm kiếm theo tên, số điện thoại, email..."
                value={searchTerm}
                onChange={handleSearchChange}
            />

            {/* Nút sắp xếp */}
            <button className="btn btn-info mb-3" onClick={() => setSortAscending(!sortAscending)}>
                Sắp xếp {sortAscending ? 'tăng dần' : 'giảm dần'}
            </button>

            {/* Bảng sinh viên */}
            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((student, index) => (
                    <tr key={index}>
                        <td>{student.name}</td>
                        <td>{student.phone}</td>
                        <td>{student.email}</td>
                        <td>
                            <button
                                className="btn btn-warning me-2"
                                data-bs-toggle="modal"
                                data-bs-target="#studentModal"
                                onClick={() => handleEdit(index)}
                            >
                                <i className="material-icons" data-toggle="tooltip" title="Edit">edit</i>
                            </button>
                            <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                                <i className="material-icons" data-toggle="tooltip" title="Delete">delete</i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Modal cho form thêm mới và chỉnh sửa */}
            <div className="modal fade" id="studentModal" tabIndex="-1" aria-labelledby="studentModalLabel" aria-hidden="true"> {/* Modal của Bootstrap */}
                <div className="modal-dialog"> {/* Định dạng modal */}
                    <div className="modal-content"> {/* Nội dung của modal */}
                        <div className="modal-header"> {/* Tiêu đề modal */}
                            <h5 className="modal-title" id="studentModalLabel">
                                {isEditing ? 'Chỉnh sửa sinh viên' : 'Thêm mới sinh viên'} {/* Hiển thị tiêu đề phù hợp */}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> {/* Nút đóng modal */}
                        </div>
                        <ModalStudent onSubmit={handleSubmit} formData={formData} onChange={handleInputChange} editing={isEditing}/> {/* Gọi component ModalStudent */}
                    </div>
                </div>
            </div>

            {/* Phân trang */}
            <nav>
                <ul className="pagination">
                    {[...Array(Math.ceil(filteredStudents.length / itemsPerPage))].map((_, i) => (
                        <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                            <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default StudentTable;