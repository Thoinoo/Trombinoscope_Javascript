
import * as ressources from './ressources.module.js';



function loadStudents() {
    fetch('./etudiants.json')
        .then(data => data.json())
        .then(
            results => load_students_via_api(results.students)
        )
}
    function load_students_via_api(students) {
        students.forEach(student => {
            fetch('https://api.github.com/users/' + student, {
                headers: new Headers({ "Authorization": "Bearer " + ressources.token })
            })
                .then(data => data.json())
                .then(results => addDiv(results))
                .catch(error => alert("que tout le monde garde son calme !"))
        });
  
    }
    
    
    
    
    
    function addDiv(student) {
    
        let d = document.createElement('div');
        d.id = student.id;
    
        let entete = document.createElement('div');
        entete.className = "flexColumnCenter";
        d.appendChild(entete);

        let nom = document.createElement('a');
        entete.appendChild(nom);
        nom.text = student.login;
        nom.href = student.html_url;
        nom.className = 'pseudo';
        nom.classList.add('overUnderLined','letterSpace5');
    
        let avatar_url = document.createElement('img');
        avatar_url.src = student.avatar_url;
        entete.appendChild(avatar_url);
    
        let public_repos = document.createElement('p');
        d.appendChild(public_repos);
        public_repos.innerHTML = "Nombre de repos : " + student.public_repos;
    
        let followers = document.createElement('p');
        d.appendChild(followers);
        followers.innerHTML = "followers   : " + student.followers;
    
    
        let bio = document.createElement('p');
        d.appendChild(bio);
        if (student.bio == null){
            bio.innerHTML = "Bio : Wow ! So empty !";
        }else{
            bio.innerHTML = "Bio : " + student.bio;
        }
        
    
    
        fetch('https://api.github.com/users/' + student.login + '/followers', {
            headers: new Headers({ "Authorization": "Bearer " + ressources.token })
        })
            .then(data => data.json())
            .then(data => generateFollowers( data, student.id))
    
        fetch('https://api.github.com/users/' + student.login + '/repos', {
            headers: new Headers({ "Authorization": "Bearer " + ressources.token })
        })
            .then(data => data.json())
            .then(data => generateRepos( data, student.id))
    
    
    
        d.className = "case";
        document.getElementById("main").appendChild(d);
    
    
    }
    
    
    function generateFollowers(followers, id) {
        
        let parent = document.getElementById(id);
    
        if (followers.length > 0){
    
            let label = document.createElement('p');
            label.innerHTML = "Follower(s) : ";
            parent.appendChild(label);
    
            for (let i = 0 ; i < followers.length ; i++){
                //console.log(followers[i].login);
    
                let follower_link = document.createElement('a');
                follower_link.text = followers[i].login;
                follower_link.href = followers[i].html_url;
                follower_link.classList.add('dottedUnderline',"follower");
    
                parent.appendChild(follower_link);
                
            }
        }
    }
    
    function generateRepos(repos, id) {
        
        
       
       if (repos.length > 0){

           let parent = document.getElementById(id);
           let list_repos =[];

           repos.forEach(element => {
               list_repos.push({name : element.name, html_url : element.html_url, pushed_at : Date.parse(element.pushed_at) });
           });

        

           // console.log(id);
           // list_repos.forEach(repo => {console.log(repo.name + " / " + repo.pushed_at );});
            list_repos = SortByDate(list_repos, id)
            //list_repos = list_repos.sort((a , b) => b.pushed_at - a.pushed_at);
           // console.log("--------------------------------------")
            //list_repos.forEach(element => {console.log(element.name + " / " + element.pushed_at) ;});

        
        
           
            let label = document.createElement('p');
            label.innerHTML = "Dernier(s) projets mis à jour : ";
            parent.appendChild(label);
    
            for (let i = 0 ; i < list_repos.length && i < 3 ; i++){
                //console.log(repos[i].login);
    
                let repos_link = document.createElement('a');
                repos_link.text = list_repos[i].name;
                repos_link.href = list_repos[i].html_url;
                repos_link.classList.add('dottedUnderline',"follower");
    
                parent.appendChild(repos_link);
                
            }
        }
    }
    
    function SortByDate(list, id){
        if (list.length > 1){
            for (let i = 0 ; i < list.length -1  ; i++){
                for (let j = 0 ; j < list.length - 1 ; j++){
                    if ( list[j].pushed_at < list[j + 1].pushed_at ) { list.splice(j , 0 , list.splice(j+1 , 1)[0]);}
                }
            }
        }
        return list;
    }
    
    
    loadStudents();