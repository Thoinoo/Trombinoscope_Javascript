
import * as ressources from './ressources.module.js';




$(document).ready(function () {
    load();
});




async function load_json_file() {

    let result = await fetch('./etudiants.json')
        .then(data => data.json())
        .then(data => load_students_via_api(data.students))
        .catch(err => console.log('erreur : ' + err));
    console.log(result);

    console.log('avant terminé');
}

async function load() {
    jQuery("#main").css("visibility", "hidden");
    var result = await load_json_file();

    loading.style.display = 'none';
    jQuery("#main").css("visibility", "visible");
    console.log('terminé');
}



async function load_students_via_api(students) {
    console.log('load_students_via_api')
    for (let student of students) {
        let result = await fetch('https://api.github.com/users/' + student, {
            headers: new Headers({ "Authorization": "Bearer " + ressources.token })
        });
        let jsonData = await result.json();
        addDiv(jsonData);
    }
}





async function addDiv(student) {

    jQuery('<div>', {
        id: student.id,
        class: 'case'
    }).appendTo('#main');


    jQuery('<div>', {
        id: student.id + "_entete",
        class: "flexColumnCenter"
    }).appendTo('#' + student.id);


    jQuery('<a>', {
        id: student.id + "_name",
        text: student.login,
        href: student.html_url,
        class: 'pseudo'
    }).appendTo('#' + student.id + "_entete");




    jQuery('<a>', {
        id: student.id + "_avatar_url_link",
        href: student.html_url
    }).appendTo('#' + student.id + "_entete");


    jQuery('<img>', {
        id: student.id + "_avatar_url",
        src: student.avatar_url
    }).attr('data-html_url', student.html_url).appendTo('#' + student.id + "_avatar_url_link");

    //document.getElementById(student.id + "_avatar_url").alt = ;


    jQuery('<p>').appendTo('#' + student.id).html("Nombre de repos : " + student.public_repos);

    jQuery('<p>').appendTo('#' + student.id).html("followers   : " + student.followers)


    if (student.bio == null) {
        jQuery('<p>').html("Bio : Wow ! So empty !").appendTo('#' + student.id);
    } else {
        jQuery('<p>').html("Bio : " + student.bio).appendTo('#' + student.id);
    }



    let result_followers = await fetch('https://api.github.com/users/' + student.login + '/followers', {
        headers: new Headers({ "Authorization": "Bearer " + ressources.token })
    });
    let jsonData_followers = await result_followers.json();
    generateFollowers(jsonData_followers, student.id);


    let result_repos = await fetch('https://api.github.com/users/' + student.login + '/repos', {
        headers: new Headers({ "Authorization": "Bearer " + ressources.token })
    });
    let jsonData_repos = await result_repos.json();
    generateRepos(jsonData_repos, student.id);
}


function generateFollowers(followers, id) {

    if (followers.length > 0) {

        jQuery('<button>', { id: id + '_button_followers' }).html("Follower(s)").appendTo('#' + id);

        for (let i = 0; i < followers.length; i++) {
            jQuery('<a>', {
                id: id + "_follower_" + followers[i].id,
                text: followers[i].login,
                href: followers[i].html_url,
                class: "dottedUnderline follower"
            }).appendTo('#' + id);
        }


        $('#' + id + '_button_followers').click(function () {
            if ($('#' + id + "_follower_" + followers[0].id).is(":visible") == true) {
                for (let i = 0; i < followers.length; i++) {
                    $('#' + id + "_follower_" + followers[i].id).slideUp();
                }
            } else {
                for (let i = 0; i < followers.length; i++) {
                    $('#' + id + "_follower_" + followers[i].id).slideDown();
                }
            }
        });


        for (let i = 0; i < followers.length; i++) {
            $('#' + id + "_follower_" + followers[i].id).slideUp();
        }
    }
}

async function generateRepos(repos, id) {

    if (repos.length > 0) {

        let list_repos = [];

        repos.forEach(element => {
            list_repos.push({ name: element.name, html_url: element.html_url, pushed_at: Date.parse(element.pushed_at) });
        });

        list_repos = SortByDate(list_repos, id)


        jQuery('<p>').html("Dernier(s) projets mis à jour : ").appendTo('#' + id);



        for (let i = 0; i < list_repos.length && i < 3; i++) {

            jQuery('<a>', {
                text: list_repos[i].name,
                href: list_repos[i].html_url,
                class: "dottedUnderline follower"
            }).appendTo('#' + id);

        }
    }
}

function SortByDate(list, id) {
    if (list.length > 1) {
        for (let i = 0; i < list.length - 1; i++) {
            for (let j = 0; j < list.length - 1; j++) {
                if (list[j].pushed_at < list[j + 1].pushed_at) { list.splice(j, 0, list.splice(j + 1, 1)[0]); }
            }
        }
    }
    return list;
}







