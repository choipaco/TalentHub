export default function timeAgo(dateString?: Date): string {
    if(!dateString) return "";
    const currentDate: Date = new Date();
    const pastDate: Date = new Date(dateString);
    const timeDifference: number = currentDate.getTime() - pastDate.getTime();
    
    const minute: number = 60 * 1000;
    const hour: number = minute * 60;
    const day: number = hour * 24;
    const month: number = day * 30;
    const year: number = day * 365;

    if (isNaN(timeDifference)) {
        return 'Invalid Date';
    }

    if (timeDifference < minute) {
        return '방금 전';
    } else if (timeDifference < hour) {
        return Math.floor(timeDifference / minute) + '분 전';
    } else if (timeDifference < day) {
        return Math.floor(timeDifference / hour) + '시간 전';
    } else if (timeDifference < month) {
        return Math.floor(timeDifference / day) + '일 전';
    } else if (timeDifference < year) {
        return Math.floor(timeDifference / month) + '달 전';
    } else {
        return Math.floor(timeDifference / year) + '년 전';
    }
}


export function formatDate(isoDateString?: string): string {
    if(!isoDateString) return "로딩중";
    const date = new Date(isoDateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    
    return `${year}. ${month}. ${day}.`;
}
