const dragItem = document.querySelector('#drag');
const dropItemGrid = document.querySelector('#drop-grid');
const dropItemFree = document.querySelector('#drop-free');

const getEvent = (event, name) => event[name] || event.changedTouches[0][name];

const getRandomColor = () => {
    const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
    return `rgb(${getRandomNumber(10, 245)}, ${getRandomNumber(10, 215)}, ${getRandomNumber(10, 245)})`;
}
dragItem.style.background = getRandomColor();

const setItemPosition = (item, x, y, shiftX, shiftY) => {
    item.style.left = `${x - shiftX}px`;
    item.style.top = `${y - shiftY}px`;
};

const copyItem = (event) => {
    const shiftX = getEvent(event, 'clientX') - dragItem.getBoundingClientRect().left;
    const shiftY = getEvent(event, 'clientY') - dragItem.getBoundingClientRect().top;

    const item = dragItem.cloneNode();
    item.id = '';

    item.classList.add('dragging');
    document.body.append(item);

    dragItem.style.background = getRandomColor();

    setItemPosition(item, getEvent(event, 'pageX'), getEvent(event, 'pageY'), shiftX, shiftY);

    const moveItem = (event) => {
        setItemPosition(item, getEvent(event, 'pageX'), getEvent(event, 'pageY'), shiftX, shiftY);
    };

    const releaseItem = (event) => {
        const elementsBelow = document.elementsFromPoint(getEvent(event, 'clientX'), getEvent(event, 'clientY'));

        const container = elementsBelow.filter(item => item.classList.contains('drop__item'));
        const containerID = container[0]?.id;

        item.classList.remove('dragging');
        item.style.left = '0';
        item.style.top = '0';
        
        switch (containerID) {
            case 'drop-grid':
                dropItemGrid.append(item);
                break;
            case 'drop-free':
                dropItemFree.append(item);
                const x = getEvent(event, 'clientX') - dropItemFree.getBoundingClientRect().left;
                const y = getEvent(event, 'clientY') - dropItemFree.getBoundingClientRect().top;
                setItemPosition(item, x, y, shiftX, shiftY);
                break;
            default:
                item.remove();
                break;
        }

        document.removeEventListener('mousemove', moveItem);
        document.removeEventListener('touchmove', moveItem);

        item.removeEventListener('mouseup', releaseItem);
        item.removeEventListener('touchend', releaseItem)
        item.removeEventListener('touchcancel', releaseItem)
    }

    item.addEventListener('dragstart', () => false);

    document.addEventListener('mousemove', moveItem);
    document.addEventListener('touchmove', moveItem);

    item.addEventListener('mouseup', releaseItem)
    item.addEventListener('touchend', releaseItem)
    item.addEventListener('touchcancel', releaseItem)
};

dragItem.addEventListener('mousedown', copyItem);
dragItem.addEventListener('touchstart', copyItem);
