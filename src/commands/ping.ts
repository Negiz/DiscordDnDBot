// test grounds
{
const {SlashCommandBuilder,MessagePayload,Routes,
InteractionResponseType,CommandInteraction,InteractionResponses, MessageActivityType, Message,PermissionFlagsBits,ChatInputCommandInteraction}= require("discord.js");

//@todo make setName make have them strings
module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("ping the bot"),
    async execute( interaction:any){
        console.log("is commandinteraction type",interaction instanceof ChatInputCommandInteraction);

        // options = {content:"PONG!",ephemeral:false};
        // let messagePayload;
        // if (options instanceof MessagePayload) messagePayload = options;
        // else messagePayload = MessagePayload.create(interaction, options);

        // const { body: data, files } = await messagePayload.resolveBody().resolveFiles();
        // interaction.client.rest.post(Routes.interactionCallback(interaction.id, interaction.token), {
        //     body: {
        //       type: InteractionResponseType.ChannelMessageWithSource,
        //       data,
        //     },
        //     files,
        //     auth: false,
        // });
        let userid = interaction.member.user.id; // user id always sent
        let client = interaction.client;
        let guildid = interaction.guildId;
        let channelid = interaction.channelId;
        //console.log(guildid,channelid);
        let channel = interaction.channel;
        //console.log(channel);
        //channel = await interaction.client.channels.fetch(channelid);
        //channel.send("asdasd");
        //channel.send("asdasd");
        //channel.send("asdasd");
        let member = await client.guilds.cache.get(guildid).members.fetch(userid);
        //console.log(member.user.username);
        //console.log(interaction.client);
        let replay = await interaction.reply({content:"Bot was pingered", ephemeral:false, fetchReply:true});

        // await new Promise(resolve => setTimeout(resolve, 1000));
        // button = MAKEBUTTON.getButton(FCommandNames.DeleteInitTables);
        // replay.channel.messages.edit(replay,{content:"Get Down",components:[button]});
        // await new Promise(resolve => setTimeout(resolve, 1000));
        // replay.edit({content:"too slow",components:[]});
        //replay.edit("This is the content now");
        
        //await interaction.editReply({content:"Lulssssssss", ephemeral:false});
        
    }
}
}