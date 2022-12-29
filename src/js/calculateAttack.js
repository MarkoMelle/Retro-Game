export default function calculateAttack(index, amount, boardSize) {
   let result = [];
   if (amount === 4) {
      result = [
         (index - 4 * (boardSize)),
         (index + 4 * (boardSize)),

         (index + 4 * (index % boardSize <= 3 && index < 28 ? boardSize + 1 : 0)),
         (index % boardSize <= 3 && index < 36) ? index + 4 * (boardSize + 1) - boardSize : index,
         (index % boardSize <= 3 && index < 44) ? (index + 4 * (boardSize + 1) - 2 * boardSize) : index,
         (index % boardSize <= 3 && index < 52) ? (index + 4 * (boardSize + 1) - 3 * boardSize) : index,
         (index % boardSize <= 4 && index < 29) ? (index + 4 * (boardSize + 1) - 1) : index,
         (index % boardSize <= 5 && index < 30) ? (index + 4 * (boardSize + 1) - 2) : index,
         (index % boardSize <= 6 && index < 31) ? (index + 4 * (boardSize + 1) - 3) : index,
         (index + 4 * (index % boardSize >= 4 && index < 32 ? boardSize - 1 : 0)),
         (index % boardSize >= 4 && index < 40) ? (index + 4 * (boardSize - 1) - boardSize) : index,
         (index % boardSize >= 4 && index < 48) ? (index + 4 * (boardSize - 1) - 2 * boardSize) : index,
         (index % boardSize >= 4 && index < 56) ? (index + 4 * (boardSize - 1) - 3 * boardSize) : index,
         (index % boardSize >= 3 && index < 32) ? (index + 4 * (boardSize - 1) + 1) : index,
         (index % boardSize >= 2 && index < 32) ? (index + 4 * (boardSize - 1) + 2) : index,
         (index % boardSize >= 1 && index < 32) ? (index + 4 * (boardSize - 1) + 3) : index,
         (index - 4 * (index % boardSize <= 3 && index > 31 ? boardSize - 1 : 0)),
         (index % boardSize <= 3 && index > 23) ? (index - 4 * (boardSize - 1) + boardSize) : index,
         (index % boardSize <= 3 && index > 15) ? (index - 4 * (boardSize - 1) + 2 * boardSize) : index,
         (index % boardSize <= 3 && index > 7) ? (index - 4 * (boardSize - 1) + 3 * boardSize) : index,
         (index % boardSize <= 4 && index > 31) ? (index - 4 * (boardSize - 1) - 1) : index,
         (index % boardSize <= 5 && index > 31) ? (index - 4 * (boardSize - 1) - 2) : index,
         (index % boardSize <= 6 && index > 31) ? (index - 4 * (boardSize - 1) - 3) : index,
         (index - 4 * (index % boardSize >= 4 && index > 35 ? boardSize + 1 : 0)),
         (index % boardSize >= 4 && index > 27) ? (index - 4 * (boardSize + 1) + boardSize) : index,
         (index % boardSize >= 4 && index > 19) ? (index - 4 * (boardSize + 1) + 2 * boardSize) : index,
         (index % boardSize >= 4 && index > 11) ? (index - 4 * (boardSize + 1) + 3 * boardSize) : index,
         (index % boardSize >= 3 && index > 31) ? (index - 4 * (boardSize + 1) + 1) : index,
         (index % boardSize >= 2 && index > 31) ? (index - 4 * (boardSize + 1) + 2) : index,
         (index % boardSize >= 1 && index > 31) ? (index - 4 * (boardSize + 1) + 3) : index,

         (index + (index % boardSize < 4 ? 4 : 0)),
         (index - (index % boardSize >= 4 ? 4 : 0)),


         (index - 3 * (boardSize)),
         (index + 3 * (boardSize)),

         (index + 3 * (index % boardSize <= 4 && index < 37 ? boardSize + 1 : 0)),
         (index + 3 * (index % boardSize <= 4 && index < 45 ? boardSize + 1 : 0) - boardSize),
         (index + 3 * (index % boardSize <= 4 && index < 53 ? boardSize + 1 : 0) - 2 * boardSize),
         (index + 3 * (index % boardSize <= 4 && index < 38 ? boardSize + 1 : 0) - 1),
         (index + 3 * (index % boardSize <= 4 && index < 39 ? boardSize + 1 : 0) - 2),

         (index + 3 * (index % boardSize >= 3 && index < 40 ? boardSize - 1 : 0)),
         (index + 3 * (index % boardSize >= 3 && index < 48 ? boardSize - 1 : 0) - boardSize),
         (index + 3 * (index % boardSize >= 3 && index < 56 ? boardSize - 1 : 0) - 2 * boardSize),
         (index + 3 * (index % boardSize >= 3 && index < 40 ? boardSize - 1 : 0) + 1),
         (index + 3 * (index % boardSize >= 3 && index < 40 ? boardSize - 1 : 0) + 2),

         (index - 3 * (index % boardSize <= 4 && index > 23 ? boardSize - 1 : 0)),
         (index - 3 * (index % boardSize <= 4 && index > 15 ? boardSize - 1 : 0) + boardSize),
         (index - 3 * (index % boardSize <= 4 && index > 7 ? boardSize - 1 : 0) + 2 * boardSize),
         (index - 3 * (index % boardSize <= 4 && index > 23 ? boardSize - 1 : 0) - 1),
         (index - 3 * (index % boardSize <= 4 && index > 23 ? boardSize - 1 : 0) - 2),

         (index - 3 * (index % boardSize >= 3 && index > 26 ? boardSize + 1 : 0)),
         (index - 3 * (index % boardSize >= 3 && index > 18 ? boardSize + 1 : 0) + boardSize),
         (index - 3 * (index % boardSize >= 3 && index > 10 ? boardSize + 1 : 0) + 2 * boardSize),
         (index - 3 * (index % boardSize >= 3 && index > 26 ? boardSize + 1 : 0) + 1),
         (index - 3 * (index % boardSize >= 3 && index > 26 ? boardSize + 1 : 0) + 2),

         (index + (index % boardSize <= 4 ? 3 : 0)),
         (index - (index % boardSize >= 3 ? 3 : 0)),


         (index - 2 * (boardSize)),
         (index + 2 * (boardSize)),

         (index + 2 * (index % boardSize <= 5 && index < 46 ? boardSize + 1 : 0)),
         (index + 2 * (index % boardSize <= 5 && index < 54 ? boardSize + 1 : 0) - boardSize),
         (index + 2 * (index % boardSize <= 5 && index < 47 ? boardSize + 1 : 0) - 1),

         (index + 2 * (index % boardSize >= 2 && index < 48 ? boardSize - 1 : 0)),
         (index + 2 * (index % boardSize >= 2 && index < 56 ? boardSize - 1 : 0) - boardSize),
         (index + 2 * (index % boardSize >= 2 && index < 48 ? boardSize - 1 : 0) + 1),

         (index - 2 * (index % boardSize <= 5 && index > 15 ? boardSize - 1 : 0)),
         (index - 2 * (index % boardSize <= 5 && index > 7 ? boardSize - 1 : 0) + boardSize),
         (index - 2 * (index % boardSize <= 5 && index > 15 ? boardSize - 1 : 0) - 1),

         (index - 2 * (index % boardSize >= 2 && index > 17 ? boardSize + 1 : 0)),
         (index - 2 * (index % boardSize >= 2 && index > 9 ? boardSize + 1 : 0) + boardSize),
         (index - 2 * (index % boardSize >= 2 && index > 17 ? boardSize + 1 : 0) + 1),

         (index + (index % boardSize <= 5 ? 2 : 0)),
         (index - (index % boardSize >= 2 ? 2 : 0)),


         (index - (boardSize)),
         (index + (boardSize)),
         (index + (index % boardSize <= 6 && index < 55 ? boardSize + 1 : 0)),
         (index + (index % boardSize >= 1 && index < 56 ? boardSize - 1 : 0)),
         (index - (index % boardSize <= 6 && index > 7 ? boardSize - 1 : 0)),
         (index - (index % boardSize >= 2 && index > 8 ? boardSize + 1 : 0)),
         (index + (index % boardSize <= 6 ? 1 : 0)),
         (index - (index % boardSize >= 1 ? 1 : 0)),
      ];
   } else if (amount === 2) {
      result = [
         (index - 2 * (boardSize)),
         (index + 2 * (boardSize)),
         (index + 2 * (index % boardSize <= 5 && index < 46 ? boardSize + 1 : 0)),
         (index + 2 * (index % boardSize >= 2 && index < 48 ? boardSize - 1 : 0)),
         (index - 2 * (index % boardSize <= 5 && index > 15 ? boardSize - 1 : 0)),
         (index - 2 * (index % boardSize >= 2 && index > 17 ? boardSize + 1 : 0)),
         (index + (index % boardSize <= 5 ? 2 : 0)),
         (index - (index % boardSize >= 2 ? 2 : 0)),

         (index - (boardSize)),
         (index + (boardSize)),
         (index + (index % boardSize <= 6 && index < 55 ? boardSize + 1 : 0)),
         (index + (index % boardSize >= 1 && index < 56 ? boardSize - 1 : 0)),
         (index - (index % boardSize <= 6 && index > 7 ? boardSize - 1 : 0)),
         (index - (index % boardSize >= 2 && index > 8 ? boardSize + 1 : 0)),
         (index + (index % boardSize <= 6 ? 1 : 0)),
         (index - (index % boardSize >= 1 ? 1 : 0)),
      ];
   } else if (amount === 1) {
      result = [
         (index - (boardSize)),
         (index + (boardSize)),
         (index + (index % boardSize <= 6 && index < 55 ? boardSize + 1 : 0)),
         (index + (index % boardSize >= 1 && index < 56 ? boardSize - 1 : 0)),
         (index - (index % boardSize <= 6 && index > 7 ? boardSize - 1 : 0)),
         (index - (index % boardSize >= 2 && index > 8 ? boardSize + 1 : 0)),
         (index + (index % boardSize <= 6 ? 1 : 0)),
         (index - (index % boardSize >= 1 ? 1 : 0))
      ];
   }
   return result;
}