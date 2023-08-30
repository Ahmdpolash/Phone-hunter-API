const dataLoad = async (phoneName = 'samsung', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`)
    const data = await res.json()

    const phones = data.data

    displayPhones(phones, isShowAll)

        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const cardContainer = document.getElementById('card-container')

    //clear data 
    cardContainer.innerHTML = ''

    // show more button 
    const showMore = document.getElementById('show-more')
    if (phones.length > 12 && !isShowAll) {
        showMore.classList.remove('hidden')
    } else {
        showMore.classList.add('hidden')
    }

    // 12 card show 

    if (!isShowAll) {
        phones = phones.slice(0, 12)
    }


    phones.forEach(phone => {
        console.log(phone);
        const phoneCard = document.createElement('div')

        phoneCard.classList = `card card-compact w-96 bg-base-100 shadow-xl`
        phoneCard.innerHTML = `

        <figure>
        <img src="${phone.image}" />
        </figure>

        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions justify-center">
                <button onclick ="showDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
            </div>
        </div>

        `
        cardContainer.appendChild(phoneCard)

    })

    toggleLoadingSpinner(false)
}

const showDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    const details = data.data
    displayDetails(details)

}


const displayDetails = (details) => {
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML = `
        <img class = "mx-auto" src =" ${details.image}">
        <h3 class="font-bold text-lg">${details.name}</h3>
        <p class="py-4">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
        <h3>Storage :${details.mainFeatures.storage}</h3>
        <h3>Display Size :${details.mainFeatures.displaySize}</h3>
        <h3>Chipset :${details.mainFeatures.chipSet}</h3>
        <h3>Memory :${details.mainFeatures.displaySize}</h3>
        <h3>Slug :${details.slug}</h3>
        <h3>Release On :${details.releaseDate}</h3>
        <h3>Brand :${details.brand}</h3>
        <h3>GPS :${details.others.GPS}</h3>
        <div class="modal-action">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
        </div>

    `
    show_details_modal.showModal()


}





// ? search input field and click button to get result 

const handleSearch = (isShowAll) => {

    const searchInput = document.getElementById('searchInput')
    const inputFieldText = searchInput.value;

    dataLoad(inputFieldText, isShowAll)

    toggleLoadingSpinner(true)
}

// loading
const toggleLoadingSpinner = (isLoading) => {
    const loading = document.getElementById('loading')
    if (isLoading) {
        loading.classList.remove('hidden')
    } else {
        loading.classList.add('hidden')
    }
}

const showMoreHandle = () => {
    handleSearch(true)
}




//show modal 





dataLoad()