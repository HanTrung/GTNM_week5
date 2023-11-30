document.addEventListener("DOMContentLoaded", function() {
    const studentForm = document.getElementById("student-form");
    const studentList = document.getElementById("student-list");
    const searchInput = document.getElementById("search-input");
    let editMode = false;

    studentForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const studentName = document.getElementById("student-name").value;
        const studentAge = document.getElementById("student-age").value;

        if (studentName && studentAge) {
            if (editMode) {
                // Sửa sinh viên
                const editedStudent = document.querySelector(".edit-mode");
                editedStudent.querySelector(".name").textContent = studentName;
                editedStudent.querySelector(".age").textContent = studentAge;
                editMode = false;
                editedStudent.classList.remove("edit-mode");
            } else {
                // Thêm mới sinh viên
                const listItem = document.createElement("li");
                listItem.innerHTML = `<span class="name">${studentName}</span> (${studentAge} tuổi) <button class="edit">Sửa</button> <button class="delete">Xóa</button>`;
                studentList.appendChild(listItem);

                // Xóa sinh viên khi nút "Xóa" được nhấn
                listItem.querySelector(".delete").addEventListener("click", function() {
                    studentList.removeChild(listItem);
                });

                // Sửa sinh viên khi nút "Sửa" được nhấn
                listItem.querySelector(".edit").addEventListener("click", function() {
                    if (editMode) {
                        const previouslyEditedStudent = document.querySelector(".edit-mode");
                        previouslyEditedStudent.classList.remove("edit-mode");
                    }
                    editMode = true;
                    listItem.classList.add("edit-mode");
                    const parts = listItem.textContent.split(' ');
                    const name = parts[0];
                    const age = parts[1];
                    document.getElementById("student-name").value = name;
                    document.getElementById("student-age").value = parseInt(age);
                });
            }

            document.getElementById("student-name").value = "";
            document.getElementById("student-age").value = "";
        }
    });

    // Tìm kiếm sinh viên theo tên
    searchInput.addEventListener("input", function() {
        const searchValue = searchInput.value.toLowerCase();

        studentList.childNodes.forEach(function (item) {
            const studentInfo = item.querySelector(".name").textContent.toLowerCase();
            if (studentInfo.includes(searchValue)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
        });
    });
});
