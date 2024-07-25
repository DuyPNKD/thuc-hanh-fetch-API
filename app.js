var coursesAPI = "http://localhost:3000/posts";

// Hàm main
function start() {
    getCourses(renderCourse);

    handlerCreateForm();
}

// Chương trình chính
start();

// Hàm lấy khóa học
function getCourses(callback) {
    fetch(coursesAPI)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Hàm tạo khóa học
function handleCreateCourse(data, callback) {
    var options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    };
    fetch(coursesAPI, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

// Hàm xóa khóa học
function handleDeleteCourse(id) {
    var options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    fetch(coursesAPI + "/" + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            var courseItem = document.querySelector(".course-item-" + id);

            if (courseItem) {
                courseItem.remove();
            }
        });
}

// Hàm render
function renderCourse(courses) {
    var listCoursesBlock = document.querySelector("#list-courses");
    var htmls = courses.map(function (course) {
        return `
            <li class="course-item-${course.id}">
                <h4>${course.name}</h4>
                <p>${course.description}</p>
                <button onclick="handleDeleteCourse('${course.id}')">Xóa</button>
            </li>
        `;
    });

    listCoursesBlock.innerHTML = htmls.join("");
}

// Hàm xử lý form
function handlerCreateForm() {
    var createBtn = document.querySelector("#create");

    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var description = document.querySelector('input[name="description"]').value;

        var formData = {
            name: name,
            description: description,
        };

        handleCreateCourse(formData, function () {
            getCourses(renderCourse);
        });
    };
}
