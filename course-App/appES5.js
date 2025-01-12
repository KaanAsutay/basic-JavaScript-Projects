// 2 course constructor
function Course(title, instructor, image){
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// 4 UI constructor
function UI(){

}

// 8
UI.prototype.addCourseToList = function(course){
    const list = document.getElementById('course-list')

    var html = `
        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
        </tr>
    `;

    list.innerHTML += html;
}

// 9
UI.prototype.clearControls = function(){
    const title = document.getElementById('title').value = "";
    const instructor = document.getElementById('instructor').value = "";
    const image = document.getElementById('image').value = "";
}

// 11
UI.prototype.deleteCourse = function(element){
    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    };
}

// 14
UI.prototype.showAlert = function(message,className){
    
    var alert = `
    <div class="alert alert-${className}">
        ${message}
    </div>
    `;
    
    const row = document.querySelector('.row')
    row.insertAdjacentHTML('beforebegin', alert);

    setTimeout(() => {
        document.querySelector('.alert').remove();
    },3000)

}

// 1
document.getElementById('new-course')
        .addEventListener('submit', function(e){
   
            const title = document.getElementById('title').value;
            const instructor = document.getElementById('instructor').value;
            const image = document.getElementById('image').value;

            // 3 create course object
            const course = new Course(title, instructor, image);

            // 5 create UI
            const ui = new UI();

            // 12
            if(title === '' || instructor === '' || image === ''){
                ui.showAlert('Please complete the form', 'warning')
            }else{
                 // 6 add course to list
                ui.addCourseToList(course);

                // 7 clear controls
                ui.clearControls();

                ui.showAlert('the course has been added', 'success')
            }
    
            e.preventDefault();
});

// 10
document.getElementById('course-list').addEventListener('click',function(e){
    const ui = new UI();
    ui.deleteCourse(e.target);
    // 13
    ui.showAlert('the course has been deleted','danger');
});