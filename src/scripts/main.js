const dragItem = document.querySelector('#drag');
const dropItemGrid = document.querySelector('#drop-grid');
const dropItemFree = document.querySelector('#drop-free');

const getRandomColor = () => {
    const getRandomNumber = (min, max) => Math.random() * (max - min) + min;
    return `rgb(${getRandomNumber(10, 215)}, ${getRandomNumber(10, 215)}, ${getRandomNumber(10, 215)})`;
}
dragItem.style.background = getRandomColor();

const setItemPosition = (item, x, y, shiftX, shiftY) => {
    item.style.left = `${x - shiftX}px`;
    item.style.top = `${y - shiftY}px`;
};

const copyItem = (event) => {
    const shiftX = event.clientX - dragItem.getBoundingClientRect().left;
    const shiftY = event.clientY - dragItem.getBoundingClientRect().top;

    dragItem.style.background = getRandomColor();

    const item = dragItem.cloneNode();
    item.id = '';

    item.classList.add('dragging');
    document.body.append(item);

    setItemPosition(item, event.pageX, event.pageY, shiftX, shiftY);

    const onMouseMove = (event) => {
        setItemPosition(item, event.pageX, event.pageY, shiftX, shiftY);
    };

    const releaseItem = (event) => {
        const elementsBelow = document.elementsFromPoint(event.clientX, event.clientY);

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

                const x = event.clientX - dropItemFree.getBoundingClientRect().left;
                const y = event.clientY - dropItemFree.getBoundingClientRect().top;
                setItemPosition(item, x, y, shiftX, shiftY);

                break;
            default:
                item.remove();

                break;
        }

        document.removeEventListener('mousemove', onMouseMove);
        item.removeEventListener('mouseup', releaseItem);
    }

    item.addEventListener('dragstart', () => false);
    document.addEventListener('mousemove', onMouseMove);

    item.addEventListener('mouseup', releaseItem)
};

dragItem.addEventListener('mousedown', copyItem);
