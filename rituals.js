// ═══════════════════════════════════════════════════════════════
// BANCO DE DADOS DE RITUAIS - ORDEM PARANORMAL
// ═══════════════════════════════════════════════════════════════
const RITUALS_DB = [
    // SANGUE
    { name: 'Hemocinese', element: 'sangue', cost: '3 PE', exec: 'Padrão', range: 'Curto', circle: 1, duration: 'Instantânea', desc: 'Você manipula o sangue de um alvo em curto alcance. O alvo sofre 2d8+3 pontos de dano de Sangue. Se o alvo for uma criatura de Sangue, ele emite uma aura que afeta outras criaturas de Sangue em curto alcance, causando 1d8 pontos de dano de Sangue.' },
    { name: 'Arma de Sangue', element: 'sangue', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: 'Cena', desc: 'Você transforma seu sangue em uma arma corpo a corpo de uma mão de sua escolha. A arma causa 1d6 pontos de dano de Sangue e tem crítico x2. Você pode usar sua Presença em vez de Força para testes de ataque com essa arma.' },
    { name: 'Cicatrização', element: 'sangue', cost: '2 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Instantânea', desc: 'Você cura 2d8+5 pontos de vida de um alvo tocado. Este ritual não pode curar dano de morte.' },
    { name: 'Punição', element: 'sangue', cost: '2 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Instantânea', desc: 'Você toca um alvo e causa 2d8 pontos de dano de Sangue. Você recupera metade dos pontos de dano causados como cura.' },
    { name: 'Sangue de Ferro', element: 'sangue', cost: '2 PE', exec: 'Reação', range: 'Pessoal', circle: 1, duration: 'Instantânea', desc: 'Quando sofre dano, você pode gastar 2 PE para reduzir esse dano em 5.' },
    { name: 'Armadura de Sangue', element: 'sangue', cost: '1 PE', exec: 'Reação', range: 'Pessoal', circle: 1, duration: '2 rodadas', desc: 'Quando é atingido por um ataque, você pode gastar 1 PE para receber +2 na Defesa por 2 rodadas.' },
    { name: 'Invólucro de Carne', element: 'sangue', cost: '3 PE', exec: 'Padrão', range: 'Pessoal', circle: 2, duration: 'Cena', desc: 'Você recebe 10 pontos de vida temporários. Quando esses pontos acabam, o ritual termina.' },
    { name: 'Transfusão', element: 'sangue', cost: '4 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Instantânea', desc: 'Você transfere parte da sua vitalidade para um alvo. Você perde 2d10 PV e o alvo recupera o mesmo valor.' },
    { name: 'Hemofagia', element: 'sangue', cost: '3 PE', exec: 'Padrão', range: 'Toque', circle: 2, duration: 'Instantânea', desc: 'Você drena o sangue de um alvo. Causa 3d8+6 dano de Sangue e você recupera metade como PV.' },
    { name: 'Sangue Corrosivo', element: 'sangue', cost: '4 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Cena', desc: 'Seu sangue se torna ácido. Por 1 cena, quando sofre dano corpo a corpo, o atacante sofre 2d6 dano de Sangue.' },
    { name: 'Controle Corporal', element: 'sangue', cost: '5 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Cena', desc: 'Você controla o sangue de um alvo. Ele deve fazer um teste de Fortitude (DT 20) ou fica paralisado por 1 rodada.' },
    { name: 'Sangue Vivo', element: 'sangue', cost: '6 PE', exec: 'Padrão', range: 'Pessoal', circle: 4, duration: 'Cena', desc: 'Seu sangue ganha consciência. Uma criatura de Sangue surge e obedece seus comandos por 1 cena.' },
    
    // MORTE
    { name: 'Decadência', element: 'morte', cost: '2 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Instantânea', desc: 'Você acelera o processo de decomposição de um alvo. Ele sofre 2d8 pontos de dano de Morte.' },
    { name: 'Cinerária', element: 'morte', cost: '3 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Instantânea', desc: 'Você desintegra um alvo já morto, deixando apenas cinzas. Não funciona em criaturas de Morte.' },
    { name: 'Espiral da Morte', element: 'morte', cost: '2 PE', exec: 'Padrão', range: 'Curto', circle: 1, duration: 'Instantânea', desc: 'Você dispara um projétil de energia necrótica. Causa 2d6+3 dano de Morte em um alvo.' },
    { name: 'Toque da Morte', element: 'morte', cost: '3 PE', exec: 'Padrão', range: 'Toque', circle: 2, duration: 'Instantânea', desc: 'Seu toque causa 3d8+6 pontos de dano de Morte. Se reduzir o alvo a 0 PV, ele morre instantaneamente.' },
    { name: 'Máscara da Morte', element: 'morte', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 2, duration: 'Cena', desc: 'Você assume a aparência de um cadáver. Criaturas de Morte não o atacam a menos que sejam atacadas.' },
    { name: 'Voz dos Mortos', element: 'morte', cost: '1 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Instantânea', desc: 'Você pode fazer uma pergunta a um cadáver. Ele responde de forma limitada.' },
    { name: 'Lembrança da Morte', element: 'morte', cost: '3 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Instantânea', desc: 'Você mostra a um alvo visões de sua própria morte. Ele deve fazer um teste de Vontade (DT 18) ou fica abalado por 1 rodada.' },
    { name: 'Consumir Morte', element: 'morte', cost: '4 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Instantânea', desc: 'Você absorve a energia de um cadáver recente. Recupera 2d8+10 PV e 2d6 PE.' },
    { name: 'Caminho da Morte', element: 'morte', cost: '3 PE', exec: 'Movimento', range: 'Pessoal', circle: 2, duration: 'Instantânea', desc: 'Você se teleporta para um local onde alguém morreu recentemente em até 9m.' },
    { name: 'Servos da Morte', element: 'morte', cost: '5 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Cena', desc: 'Você reanima 1d4 cadáveres como zumbis que obedecem seus comandos.' },
    { name: 'Aura de Decadência', element: 'morte', cost: '4 PE', exec: 'Padrão', range: 'Pessoal', circle: 3, duration: 'Cena', desc: 'Uma aura de 3m de raio causa 1d6 dano de Morte por rodada em criaturas dentro dela.' },
    { name: 'Beijo da Morte', element: 'morte', cost: '6 PE', exec: 'Padrão', range: 'Toque', circle: 4, duration: 'Instantânea', desc: 'Toque mortal. O alvo faz teste de Fortitude (DT 25) ou morre instantaneamente. Se passar, sofre 6d8 dano.' },
    
    // CONHECIMENTO
    { name: 'Cicatrização Paranormal', element: 'conhecimento', cost: '2 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Instantânea', desc: 'Você cura 2d8+5 pontos de vida de um alvo tocado. Este ritual não pode curar dano de morte.' },
    { name: 'Salto Fantasma', element: 'conhecimento', cost: '1 PE', exec: 'Movimento', range: 'Pessoal', circle: 1, duration: 'Instantânea', desc: 'Você se teleporta para qualquer lugar em até 9m que possa ver.' },
    { name: 'Paradoxo', element: 'conhecimento', cost: '3 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Instantânea', desc: 'O alvo deve repetir sua última ação no próximo turno, mas contra si mesmo.' },
    { name: 'Precognição', element: 'conhecimento', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: 'Cena', desc: 'Você recebe +5 em Iniciativa e não pode ser surpreendido.' },
    { name: 'Visão do Conhecimento', element: 'conhecimento', cost: '1 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: 'Cena', desc: 'Você enxerga em escuridão total e vê criaturas invisíveis.' },
    { name: 'Memória Analítica', element: 'conhecimento', cost: '1 PE', exec: 'Livre', range: 'Pessoal', circle: 1, duration: 'Instantânea', desc: 'Você pode refazer um teste de perícia mental que acabou de falhar.' },
    { name: 'Telepatia', element: 'conhecimento', cost: '2 PE', exec: 'Padrão', range: 'Ilimitado', circle: 1, duration: 'Cena', desc: 'Você pode se comunicar mentalmente com qualquer criatura que conheça.' },
    { name: 'Vínculo Telepático', element: 'conhecimento', cost: '3 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Cena', desc: 'Você e um alvo podem ler os pensamentos um do outro.' },
    { name: 'Distorcer Aparência', element: 'conhecimento', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: 'Cena', desc: 'Você altera sua aparência física. Não muda de tamanho ou forma básica.' },
    { name: 'Aprimoramento Mental', element: 'conhecimento', cost: '3 PE', exec: 'Padrão', range: 'Pessoal', circle: 2, duration: 'Cena', desc: 'Você recebe +2 em Inteligência e Presença.' },
    { name: 'Manipular Memória', element: 'conhecimento', cost: '4 PE', exec: 'Padrão', range: 'Toque', circle: 3, duration: 'Instantânea', desc: 'Você altera uma memória recente do alvo. Teste de Vontade (DT 20) para resistir.' },
    { name: 'Projeção Astral', element: 'conhecimento', cost: '5 PE', exec: 'Padrão', range: 'Pessoal', circle: 3, duration: 'Cena', desc: 'Seu espírito deixa o corpo e pode se mover invisível e intangível por até 100m.' },
    { name: 'Verdade Absoluta', element: 'conhecimento', cost: '3 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Cena', desc: 'O alvo não pode mentir. Teste de Vontade (DT 18) para resistir.' },
    { name: 'Anulação de Ritual', element: 'conhecimento', cost: '4 PE', exec: 'Reação', range: 'Curto', circle: 3, duration: 'Instantânea', desc: 'Você cancela um ritual que está sendo conjurado em curto alcance.' },
    { name: 'Portal', element: 'conhecimento', cost: '6 PE', exec: 'Padrão', range: 'Curto', circle: 4, duration: 'Cena', desc: 'Você abre um portal entre dois pontos em até 100m um do outro.' },
    
    // ENERGIA
    { name: 'Emitir Esfera', element: 'energia', cost: '2 PE', exec: 'Padrão', range: '9m', circle: 1, duration: 'Instantânea', desc: 'Você dispara uma esfera de energia. Causa 3d6 pontos de dano de Energia em área.' },
    { name: 'Invisibilidade', element: 'energia', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: '2 rodadas', desc: 'Você fica invisível por 2 rodadas. Ataques contra você têm 50% de chance de falha.' },
    { name: 'Velocidade Sobrenatural', element: 'energia', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: 'Cena', desc: 'Você recebe +3m de deslocamento e +2 em Reflexos.' },
    { name: 'Campo de Força', element: 'energia', cost: '2 PE', exec: 'Padrão', range: 'Pessoal', circle: 1, duration: 'Cena', desc: 'Você recebe +4 na Defesa.' },
    { name: 'Raio', element: 'energia', cost: '1 PE', exec: 'Padrão', range: '9m', circle: 1, duration: 'Instantânea', desc: 'Um raio de energia causa 2d6+3 dano de Energia em um alvo.' },
    { name: 'Escudo Elétrico', element: 'energia', cost: '2 PE', exec: 'Reação', range: 'Pessoal', circle: 1, duration: 'Instantânea', desc: 'Quando é atacado, gera um escudo que reduz o dano em 10.' },
    { name: 'Telecinese', element: 'energia', cost: '2 PE', exec: 'Padrão', range: '9m', circle: 2, duration: 'Concentração', desc: 'Você move objetos com a mente. Pode mover até 50kg.' },
    { name: 'Explosão de Energia', element: 'energia', cost: '3 PE', exec: 'Padrão', range: 'Pessoal', circle: 2, duration: 'Instantânea', desc: 'Uma explosão em 6m de raio causa 4d6 dano de Energia.' },
    { name: 'Voo', element: 'energia', cost: '3 PE', exec: 'Padrão', range: 'Pessoal', circle: 2, duration: 'Cena', desc: 'Você pode voar com deslocamento de 9m.' },
    { name: 'Relâmpago', element: 'energia', cost: '4 PE', exec: 'Padrão', range: '18m', circle: 3, duration: 'Instantânea', desc: 'Um relâmpago atinge um alvo causando 5d8+10 dano de Energia.' },
    { name: 'Tempestade', element: 'energia', cost: '5 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Cena', desc: 'Uma tempestade elétrica de 9m de raio causa 2d6 dano de Energia por rodada.' },
    { name: 'Desintegrar', element: 'energia', cost: '6 PE', exec: 'Padrão', range: '9m', circle: 4, duration: 'Instantânea', desc: 'Um raio desintegra o alvo. Causa 8d10 dano de Energia. Se reduzir a 0 PV, o alvo é desintegrado.' },
    
    // MEDO
    { name: 'Medo Tangível', element: 'medo', cost: '2 PE', exec: 'Padrão', range: 'Curto', circle: 1, duration: '1 rodada', desc: 'O alvo fica paralisado de medo por 1 rodada. Teste de Vontade (DT 15) para resistir.' },
    { name: 'Pesadelo', element: 'medo', cost: '2 PE', exec: 'Padrão', range: 'Curto', circle: 1, duration: 'Instantânea', desc: 'O alvo sofre 2d6 dano de Medo mental. Reduz Sanidade temporariamente.' },
    { name: 'Marca do Medo', element: 'medo', cost: '1 PE', exec: 'Padrão', range: 'Toque', circle: 1, duration: 'Cena', desc: 'Você marca um alvo. Criaturas de Medo priorizam atacá-lo.' },
    { name: 'Visões de Terror', element: 'medo', cost: '3 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Cena', desc: 'O alvo vê horrores. Deve fazer teste de Vontade (DT 18) ou fica atordoado por 1 rodada e abalado por 1 cena.' },
    { name: 'Aura de Pavor', element: 'medo', cost: '3 PE', exec: 'Padrão', range: 'Pessoal', circle: 2, duration: 'Cena', desc: 'Uma aura de 6m de raio faz inimigos perderem 2 em todos os testes.' },
    { name: 'Sussurros Insanos', element: 'medo', cost: '2 PE', exec: 'Padrão', range: 'Curto', circle: 2, duration: 'Cena', desc: 'Você sussurra verdades impossíveis. O alvo sofre 1d6 dano de Sanidade por rodada.' },
    { name: 'Olhar do Vazio', element: 'medo', cost: '4 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Instantânea', desc: 'Seus olhos mostram o vazio. O alvo deve fazer teste de Vontade (DT 22) ou fica louco por 1d4 rodadas.' },
    { name: 'Realidade Distorcida', element: 'medo', cost: '4 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Cena', desc: 'A realidade distorce ao redor do alvo. Ele tem desvantagem em todos os testes.' },
    { name: 'Pavor Paralisante', element: 'medo', cost: '5 PE', exec: 'Padrão', range: 'Curto', circle: 3, duration: 'Cena', desc: 'O alvo fica paralisado de medo. Teste de Vontade (DT 20) no início de cada turno para agir.' },
    { name: 'Toque do Medo', element: 'medo', cost: '6 PE', exec: 'Padrão', range: 'Toque', circle: 4, duration: 'Instantânea', desc: 'Seu toque causa terror absoluto. O alvo deve fazer teste de Vontade (DT 25) ou morre de medo.' },
    { name: 'Forma do Medo', element: 'medo', cost: '5 PE', exec: 'Padrão', range: 'Pessoal', circle: 4, duration: 'Cena', desc: 'Você assume uma forma de pesadelo. Causa medo em todos que o veem. +4 em todos os atributos.' }
];
