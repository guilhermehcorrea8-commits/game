// using System;
// using System.Threading;

// class Program
// {
//     static int largura = 80;

//     static int p1X = 15;
//     static int p2X = 60;

//     static int p1Vida = 100;
//     static int p2Vida = 100;

//     static bool p1Defesa;
//     static bool p2Defesa;

//     static bool p1Atacando;
//     static bool p2Atacando;

//     static int p1Cooldown;
//     static int p2Cooldown;

//     static void Main()
//     {
//         Console.CursorVisible = false;

//         while (p1Vida > 0 && p2Vida > 0)
//         {
//             Atualizar();
//             Desenhar();
//             Thread.Sleep(60);
//         }

//         Console.Clear();
//         Console.WriteLine(p1Vida <= 0 ? "🔥 B VENCEU 🔥" : "🔥 A VENCEU 🔥");
//         Console.Beep(800, 500);
//     }

//     static void Atualizar()
//     {
//         if (p1Cooldown > 0) p1Cooldown--;
//         if (p2Cooldown > 0) p2Cooldown--;

//         p1Defesa = false;
//         p2Defesa = false;
//         p1Atacando = false;
//         p2Atacando = false;

//         while (Console.KeyAvailable)
//         {
//             var key = Console.ReadKey(true).Key;

//             // PLAYER A
//             if (key == ConsoleKey.A) p1X--;
//             if (key == ConsoleKey.D) p1X++;
//             if (key == ConsoleKey.S) p1Defesa = true;

//             if (key == ConsoleKey.W && p1Cooldown == 0)
//                 Atacar(ref p2Vida, p2Defesa, ref p1Cooldown, ref p1Atacando, p1X, p2X);

//             if (key == ConsoleKey.Q && p1Cooldown == 0)
//                 Especial(ref p2Vida, p2Defesa, ref p1Cooldown);

//             // PLAYER B
//             if (key == ConsoleKey.LeftArrow) p2X--;
//             if (key == ConsoleKey.RightArrow) p2X++;
//             if (key == ConsoleKey.DownArrow) p2Defesa = true;

//             if (key == ConsoleKey.UpArrow && p2Cooldown == 0)
//                 Atacar(ref p1Vida, p1Defesa, ref p2Cooldown, ref p2Atacando, p2X, p1X);

//             if (key == ConsoleKey.P && p2Cooldown == 0)
//                 Especial(ref p1Vida, p1Defesa, ref p2Cooldown);
//         }

//         if (p1X < 1) p1X = 1;
//         if (p1X > largura - 10) p1X = largura - 10;

//         if (p2X < 1) p2X = 1;
//         if (p2X > largura - 10) p2X = largura - 10;
//     }

//     static void Atacar(ref int vida, bool defesa, ref int cooldown, ref bool atacando, int xAtacante, int xAlvo)
//     {
//         if (Math.Abs(xAtacante - xAlvo) <= 3)
//         {
//             int dano = defesa ? 4 : 8;
//             vida = Math.Max(0, vida - dano);
//             Console.Beep(600, 80);
//             atacando = true;
//         }

//         cooldown = 10;
//     }

//     static void Especial(ref int vida, bool defesa, ref int cooldown)
//     {
//         int dano = defesa ? 10 : 20;
//         vida = Math.Max(0, vida - dano);

//         Console.Beep(1000, 150);
//         Console.Beep(1200, 150);
//         Console.Beep(1400, 150);

//         cooldown = 30;
//     }

//     static void Desenhar()
//     {
//         Console.Clear();

//         Console.WriteLine($"A VIDA: {p1Vida}  CD:{p1Cooldown}    B VIDA: {p2Vida}  CD:{p2Cooldown}");
//         Console.WriteLine(new string('-', largura));

//         DesenharBoneco(p1X, 6, "A", p1Defesa, p1Atacando);
//         DesenharBoneco(p2X, 6, "B", p2Defesa, p2Atacando);
//     }

//     static void DesenharBoneco(int x, int y, string nome, bool defesa, bool ataque)
//     {
//         Console.SetCursorPosition(x, y);
//         Console.Write(" O ");

//         Console.SetCursorPosition(x, y + 1);
//         if (defesa)
//             Console.Write("[|]");
//         else if (ataque)
//             Console.Write("-|-");
//         else
//             Console.Write("/|\\");

//         Console.SetCursorPosition(x, y + 2);
//         Console.Write("/ \\");

//         Console.SetCursorPosition(x, y + 3);
//         Console.Write($" {nome} ");
//     }
// }
