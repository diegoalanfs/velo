export function generateOrderCode() {
    const prefix = 'VLO';

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

    let part1 = '';
    for (let i = 0; i < 2; i++) {
        part1 += chars[Math.floor(Math.random() * chars.length)];
    }

    let part2 = '';
    for (let i = 0; i < 4; i++) {
        part2 += chars[Math.floor(Math.random() * chars.length)];
    }

    return `${prefix}-${part1}${part2}`;
}