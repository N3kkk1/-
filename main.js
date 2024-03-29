const Discord = require('discord.js') // подключение библиотеки                  
const client = new Discord.Client() // создание клиента

client.on('ready', () =>{ // ивент, когда бот запускается https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-ready
    client.generateInvite("ADMINISTRATOR").then(invite => console.log(`Ссылка на добавление ${invite}`))
    console.log(`Привет! ${client.user.tag} запустился!`) // информация в консоль про успешный запуск
})

client.on('message', message =>{ // ивент, когда приходит любое сообщение в чат 
    if (message.author.bot) return; // если автор сообщения - бот, ничего не происходит 
    if (message.content == '!профиль') { // если пользователь написал "!профиль" 
    let embed = new Discord.MessageEmbed() // создание сообщения
    .setTitle(message.author.username) // в тайтле имя автора 
    let status = ''
    switch (message.author.presence.status) { // проверка статусов 
        case 'online':
            status = 'онлайн'; break; 
            case 'idle':
                status = ':orange_circle:нет на месте'; break;
                case 'offline':
                    status = 'нет в сети'; break;
                    case 'dnd':
                        status = ':red_circle:не беспокоить'; break;
    }
    embed.setDescription(`**Ваш дискорд айди: ${message.author.id}
    Ваш статус: ${status}
    Дата создания аккаунта: ${message.author.createdAt.toLocaleDateString()}
    Дата входа на сервер: ${message.member.joinedAt.toLocaleDateString()}
    **`) // описание ембеда
    .setColor('RANDOM') // рандомный цвет ембеда
    .setThumbnail(message.author.avatarURL()) // вставляем аватарку пользователя
    message.channel.send(embed) // отправляем сообщение в канал где была написана команда   
    }
})

client.on('messageDelete', message =>{ // ивент, когда удаляется любое сообщение с сервера 
    let embed = new Discord.MessageEmbed()
    .setTitle('Было удалено сообщение!')
    .setColor('RANDOM')
    .addField(`Удалённое сообщение:`, message.content, true)
    .addField("Автор:",`${message.author.tag} (${message.author})`,true)
    .addField("Канал:", `${message.channel}`, false)
    .setFooter(' - ',`${message.author.avatarURL()}`)
    .setTimestamp(message.createdAt);
  client.channels.cache.get("АЙДИ КАНАЛА С ЛОГАМИ").send(embed); // айди вашего канала с логами
})

client.on('guildMemberAdd', member =>{ // ивент, когда пользователь присоединяется к серверу 
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Привет, ${member.user.username}!`)
    .setDescription(`**Ты попал на мой сервер!
    Ты наш \`${client.guilds.get("АЙДИ СЕРВЕРА").memberCount}\` участник! **`) // айди вашего сервера             
    .setColor('RANDOM')
    member.send(embed); // отправка сообщения в лс 

    let embed2 = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Пользователь вошел на сервер`)
    .addField('Пользователь:', member.user)
    .setColor('RANDOM')
    member.send(embed);
    client.channels.cache.get('АЙДИ КАНАЛА С ЛОГАМИ').send(embed2) // айди вашего канала с логами
})

client.on('guildMemberRemove', member => { // ивент, когда пользователь выходит с сервера 
    let embed = new Discord.MessageEmbed()
    .setThumbnail(member.user.avatarURL())
    .setTitle(`Пользователь покинул сервер`)
    .addField('Пользователь:', member.user)
    .setColor('RANDOM')
    member.send(embed);
    client.channels.cache.get('АЙДИ КАНАЛА С ЛОГАМИ').send(embed) // айди вашего канала с логами
  })

async function change() {
    let members = client.guilds.cache.get("АЙДИ ВОЙСА").memberCount // сколько людей на сервере + указать айди своего сервера
    client.channels.cache.get("АЙДИ СЕРВЕРА").setName(`На сервере: ${members}`); // свой айди войса
}

var interval = setInterval(function () { change(); }, 20000  ); // время обновления в миллисекундах

client.login('NzQ0MjE3Njc1MjczODYzMzgw.XzgAuA.VH4SsVsTs1UtA_OO2FwxjizZPRg') // токен вашего бота



