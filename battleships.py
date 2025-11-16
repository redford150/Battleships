import random

board = [["O" for _ in range(5)] for _ in range(5)]

def print_board(board):
    for row in board:
        print(" ".join(row))

def place_ship(board):
    r = random.randint(0, 4)
    c = random.randint(0, 4)
    return r, c

ship_r, ship_c = place_ship(board)

print("BATTLESHIPS!   -   FIGHT! (5 turns to sink the ship)")
print_board(board)

for turn in range(5):
    print(f"\nTurn {turn+1}")

    guess_r = int(input("Guess Row (0-4): "))
    guess_c = int(input("Guess Column (0-4): "))

    if (guess_r == ship_r) and (guess_c == ship_c):
        print("Now why did you do that, you are sunk my battleship!")
        board[guess_r][guess_c] = "X"
        break

    elif (0 <= guess_r < 5) and (0 <= guess_c < 5):
        if board[guess_r][guess_c] == "M":
            print("What are you doin, you did that already!")
        else:
            print("You missed, Loser!")
            board[guess_r][guess_c] = "M"
    else:
        print("Well either your plain stupid or dont know how coordinates work, thus making you stupid!")

    print_board(board)

print("\nGame Over! The ship was at:", ship_r, ship_c)
