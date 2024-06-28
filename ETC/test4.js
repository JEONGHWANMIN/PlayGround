function solution(play_list, listen_time) {
  const total_play_time = play_list.reduce((acc, cur) => acc + cur, 0);
  if (total_play_time <= listen_time) return play_list.length;

  let max_song = 0;
  for (let i = 0; i < play_list.length; i++) {
    const sort_play_list = [...play_list.slice(i), ...play_list.slice(0, i)];
    let temp_song = 0;
    let temp_time = listen_time;
    for (let j = 0; j < sort_play_list.length; j++) {
      const isFirstSong = j === 0;
      if (isFirstSong) {
        temp_time = temp_time - 1;
        temp_song = temp_song + 1;
      } else {
        temp_time = temp_time - sort_play_list[j];
        temp_song = temp_song + 1;
      }
      if (temp_time <= 0) break;
    }
    max_song = Math.max(max_song, temp_song);
  }

  return max_song;
}

console.log(solution([2, 3, 1, 4], 3));
console.log(solution([1, 2, 3, 4], 5));
console.log(solution([1, 2, 3, 4], 20));
