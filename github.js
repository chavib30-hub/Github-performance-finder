const btn = document.querySelector('#btn')
const error_div = document.querySelector(".error")
const user_card = document.querySelector('.user-card')
const cards = document.querySelector('.cards')
const load = document.querySelector('.loading')
btn.addEventListener('click', async () => {
    const username = document.getElementById('username').value.trim();
    if (!username) {
        return alert("Enter username");
    }
    try {
        load.style.display = "flex"
        let response = await fetch(`https://api.github.com/users/${username}`)
        let data = await response.json();
        console.log(data)
        if (data.status == "404") {
            error_div.style.display = "flex"
            user_card.style.display = "none";
            cards.style.display = "none";
        } else if (data.id != 0) {
            error_div.style.display = "none"
            user_card.style.display = "flex";
            cards.style.display = "grid";
            document.getElementById('useravtar').src = data.avatar_url;
            document.getElementById('username').textContent = data.login;
            document.getElementById('use').textContent = data.login;
            document.getElementById('biod').textContent = data.bio || 'No bio available';
            document.getElementById('repocounts').textContent = data.public_repos;
            document.getElementById('followerscounts').textContent = data.followers;
            document.getElementById('followingcounts').textContent = data.following;
            let respos = await fetch(`https://api.github.com/users/${username}/repos`)
            let datas = await respos.json();
            if (datas.length > 0) {
                const toprepo = datas.sort((a, b) => b.stargazers_count - a.stargazers_count)[0]
                document.getElementById('toprepos').textContent = toprepo.name;
            }
            else {
                document.getElementById('toprepos').textContent = '-';

            }

        }

    }
    catch (error) {
        alert(error.message);
    } finally {
        load.style.display = "none";
    }

})
