var currentAddr = null;
var web3;
var usrBal;
var contract;
const minerAddress = '0x6c295C9Ab839d1870C11CCCE1735aca266B0a2F9';
const mAddress = '0x090e65bc4f8c08f29D0dA8665bFa1C7242666Ed8';
var started = true;



const abi = [{
    "constant": true,
    "inputs": [],
    "name": "PERCENTS_DIVIDER",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserDownlineCount",
    "outputs": [{
        "name": "referrals",
        "type": "uint256[10]"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserDividends",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserbonuspercent",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserAvailable",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Liquidity",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "started",
    "outputs": [{
        "name": "",
        "type": "bool"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "senderAddress",
        "type": "address"
    }, {
        "name": "dataId",
        "type": "uint256"
    }],
    "name": "getDownlineRef",
    "outputs": [{
        "name": "",
        "type": "address"
    }, {
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "TIME_STEP",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferrer",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }, {
        "name": "",
        "type": "uint256"
    }],
    "name": "RefUser",
    "outputs": [{
        "name": "refUserAddress",
        "type": "address"
    }, {
        "name": "refLevel",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferralTotalBonus",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getcurrentwithdrawntime",
    "outputs": [{
        "name": "withdrawntimes_",
        "type": "uint256"
    }, {
        "name": "withdrawnblocktime_",
        "type": "uint256"
    }, {
        "name": "block_",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "PROJECT_FEE",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getSiteInfo",
    "outputs": [{
        "name": "_totalInvested",
        "type": "uint256"
    }, {
        "name": "_totalBonus",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserTotalSeedWithdrawn",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalInvested",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "PERCENT_STEP",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "referrer",
        "type": "address"
    }, {
        "name": "plan",
        "type": "uint8"
    }],
    "name": "invest",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": false,
    "inputs": [{
        "name": "times",
        "type": "uint8"
    }],
    "name": "bonus",
    "outputs": [],
    "payable": true,
    "stateMutability": "payable",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
    }],
    "name": "REFERRAL_PERCENTS",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserInfo",
    "outputs": [{
        "name": "totalDeposit",
        "type": "uint256"
    }, {
        "name": "totalWithdrawn",
        "type": "uint256"
    }, {
        "name": "totalReferrals",
        "type": "uint256"
    }, {
        "name": "yourboomplan",
        "type": "uint256"
    }, {
        "name": "yourbonuspercent",
        "type": "uint256"
    }, {
        "name": "Userbonuspercent",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "totalRefBonus",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferralWithdrawn",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserTotalDeposits",
    "outputs": [{
        "name": "amount",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "commissionWallet",
    "outputs": [{
        "name": "",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserAmountOfDeposits",
    "outputs": [{
        "name": "",
        "type": "uint256"
    },{
        "name": "yourbonusminmoney",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "plan",
        "type": "uint8"
    }],
    "name": "getPlanInfo",
    "outputs": [{
        "name": "time",
        "type": "uint256"
    }, {
        "name": "percent",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }, {
        "name": "index",
        "type": "uint256"
    }],
    "name": "getUserDepositInfo",
    "outputs": [{
        "name": "plan",
        "type": "uint8"
    }, {
        "name": "percent",
        "type": "uint256"
    }, {
        "name": "amount",
        "type": "uint256"
    }, {
        "name": "start",
        "type": "uint256"
    }, {
        "name": "finish",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "uint256"
    }],
    "name": "SEED_PERCENTS",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserCheckpoint",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserSeedIncome",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "INVEST_MIN_AMOUNT",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "",
        "type": "address"
    }],
    "name": "referralCount_",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserReferralBonus",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "PLANPER_DIVIDER",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getcurrentseedincome",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserTotalWithdrawn",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "constant": true,
    "inputs": [{
        "name": "userAddress",
        "type": "address"
    }],
    "name": "getUserTotalReferrals",
    "outputs": [{
        "name": "",
        "type": "uint256"
    }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
}, {
    "inputs": [{
        "name": "wallet",
        "type": "address"
    }],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": false,
        "name": "user",
        "type": "address"
    }],
    "name": "Newbie",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "name": "plan",
        "type": "uint8"
    }, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }],
    "name": "NewDeposit",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }],
    "name": "Withdrawn",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "referrer",
        "type": "address"
    }, {
        "indexed": true,
        "name": "referral",
        "type": "address"
    }, {
        "indexed": true,
        "name": "level",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }],
    "name": "RefBonus",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "referrer",
        "type": "address"
    }, {
        "indexed": true,
        "name": "referral",
        "type": "address"
    }, {
        "indexed": true,
        "name": "level",
        "type": "uint256"
    }, {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
    }],
    "name": "SeedIncome",
    "type": "event"
}, {
    "anonymous": false,
    "inputs": [{
        "indexed": true,
        "name": "user",
        "type": "address"
    }, {
        "indexed": false,
        "name": "totalAmount",
        "type": "uint256"
    }],
    "name": "FeePayed",
    "type": "event"
}];

// ------ contract calls

function loadContracts() {
    console.log('Loading contracts...')
    web3 = window.web3
    contract = new web3.eth.Contract(abi, minerAddress);
    console.log('Done loading contracts.')
}

function myReferralLink(address) {
    var prldoc = document.getElementById('reflink')
    prldoc.textContent = window.location.origin + "?ref=" + address
    var copyText = document.getElementById("reflink");
    copyText.value = prldoc.textContent
}

async function myConnect(){
    var element = document.getElementById("dotting");
    element.classList.toggle("dot");
}

async function connect() {
    console.log('Connecting to wallet...')
    try {
        if (started) {
            $('#buy-eggs-btn').attr('disabled', false)
        }
        var accounts = await ethereum.request({ method: 'eth_requestAccounts' })
        if (accounts.length == 0) {
            console.log('Please connect to MetaMask.');
            $('#enableMetamask').html('Connect')
        } else if (accounts[0] !== currentAddr) {
            loginActions(accounts);
        }
    } catch (err) {
        if (err.code === 4001) {
            // EIP-1193 userRejectedRequest error
            // If this happens, the user rejected the connection request.
            alert('Please connect to MetaMask.');
        } else {
            console.error(err);
        }
        $('#enableMetamask').attr('disabled', false)
    }
}

function loginActions(accounts) {
    currentAddr = accounts[0];
    if (currentAddr !== null) {
        myReferralLink(currentAddr);
        console.log('Wallet connected = ' + currentAddr);

        loadContracts();
        refreshData();

        let shortenedAccount = currentAddr.replace(currentAddr.substring(3, 39), "***");
        $('#enableMetamask').html(shortenedAccount);
    }
    $('#enableMetamask').attr('disabled', true);
}

async function loadWeb3() {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        $('#enableMetamask').attr('disabled', false)
        if (window.ethereum.selectedAddress !== null) {
            await connect();
                setTimeout(function () {
                controlLoop()
                controlLoopFaster()
            }, 1000)
        }
    } else {
        $('#enableMetamask').attr('disabled', true)
    }
}

window.addEventListener('load', function () {
    setStartTimer();
    loadWeb3()
	
})

$('#enableMetamask').click(function () {
    connect()
});

function controlLoop() {
    refreshData()
    setTimeout(controlLoop, 25000)
}

function controlLoopFaster() {
    setTimeout(controlLoopFaster, 30)
}

function roundNum(num) {
    if (num == 0) { return 0};
    if (num < 1) {
        return parseFloat(num).toFixed(4);
    }
    return parseFloat(parseFloat(num).toFixed(2));
}

function refreshData() {
    console.log('Refreshing data...')

	
	if(!contract || !contract.methods){
        console.log('contract is not yet loaded')
        loadContracts()
        // return;
    }





    if(!currentAddr) {
        console.log('check if user is logged in');
        web3.eth.getAccounts(function(err, accounts){
            if (err != null) {
                console.error("An error occurred: "+err);
        }
            else if (accounts.length == 0) {
                console.log("User is not logged in to MetaMask");
            }
            else {console.log("User is logged in to MetaMask");
            loginActions(accounts);}
        });
        return;
    } else {
		
		

		
		
		
		
		

        web3.eth.getBalance(currentAddr).then(userBalance => {
            usrBal = userBalance;
            var amt = web3.utils.fromWei(userBalance);
            $("#user-balance").html(roundNum(amt));
            //var usd = Number(priceInUSD*amt).toFixed(2);
            //$("#user-balance-usd").html(usd)
        }).catch((err) => {
            console.log(err);
        });
    
	
	
		const contractInstance = new web3.eth.Contract(abi, minerAddress);

	
	
		contractInstance.methods.getUserDividends(currentAddr).call().then(function(div) {

			var divi = div / (10 ** 18);
			var data1 = divi.toFixed(6);


			$("#dividends").html(data1);

			//  console.log(data1);

			contractInstance.methods.getcurrentseedincome(currentAddr).call().then(function(inc) {

				console.log("HI");
				console.log(inc);
				var seedinc = inc / (10 ** 18);
				var seed = seedinc.toFixed(6);


				$("#seedcurrent").html(seed);

				contractInstance.methods.getUserSeedIncome(currentAddr).call().then(function(inc) {

					var tseedinc = inc / (10 ** 18);
					var tseed = tseedinc.toFixed(6);


					$("#seed").html(tseed);




					contractInstance.methods.getUserReferralTotalBonus(currentAddr).call().then(function(info) {
						var earnings = info / (10 ** 18);
						$("#earning").html(earnings);

						contractInstance.methods.getUserReferralBonus(currentAddr).call().then(function(info) {
							var cearnings = info / (10 ** 18);
							$("#currentearning").html(cearnings);

							var wbal = parseFloat(data1) + parseFloat(seed) + parseFloat(cearnings);
							var Referral_tearning = parseFloat(earnings);
							var tseed_tearning = parseFloat(tseed);
							if(wbal!=0){
								wbal = wbal.toFixed(6);
							}
							if(Referral_tearning!=0){
								Referral_tearning = Referral_tearning.toFixed(6);
							}
							if(tseed_tearning!=0){
								tseed_tearning = tseed_tearning.toFixed(6);
							}
							
							$("#bal").html(wbal);
							$("#Referral_tearning").html(Referral_tearning);
							$("#tseed_tearning").html(tseed_tearning);
						});



					});


				});


			});


		});


	
		contractInstance.methods.getUserInfo(currentAddr).call().then(function(info) {

			var totaldeposit = info.totalDeposit / (10 ** 18);
			var totalwithdraw = info.totalWithdrawn / (10 ** 18);
			var yourboomPlan_ = info.yourboomplan-1;
			var yourboomPercent_ = info.Userbonuspercent/ (10**19);
			var totalwithdraw = parseFloat(totalwithdraw);
			console.log(totalwithdraw);
			var totalreferral = info.totalReferrals;
			var tyourbonus = info.yourbonus;
			var tyourbonuspercent = info.yourbonuspercent/ (10**22);
			if(totalwithdraw!=0){
				totalwithdraw = totalwithdraw.toFixed(6);
			}
			if(yourboomPercent_!=0){
				yourboomPercent_ = yourboomPercent_.toFixed(6);
			}
			$("#totdep").html(totaldeposit);
			$("#totwith").html(totalwithdraw);
			$("#tuser").html(totalreferral);
			$("#userplan").html(yourboomPlan_);
			$("#userpercent").html(yourboomPercent_);
			$("#userbonus").html(tyourbonus);
			$("#userbonuspercent").html(tyourbonuspercent);
		});
	
		contractInstance.methods.getUserAmountOfDeposits(currentAddr).call().then(function(info_) {

			var yourbonusminmoney_ = info_.yourbonusminmoney / (10 ** 18);
			$("#userbonusminmoney").html(yourbonusminmoney_);
		});


		contractInstance.methods.getcurrentwithdrawntime(currentAddr).call().then(function(info__) {

			var withdrawntimes = info__.withdrawntimes_;
			var withdrawnblocktime = info__.withdrawnblocktime_;
			var block_time = info__.block_;
			$("#userwithdrawntimes").html(withdrawntimes);
			
			if((block_time-withdrawnblocktime)>10000000 || ((block_time-withdrawnblocktime)>259200)){
				$("#userwithdrawnblocktime_day").html(0);
				$("#userwithdrawnblocktime_hour").html(0);
				$("#userwithdrawnblocktime_minute").html(0);
				$("#userwithdrawnblocktime_second").html(0);
			}else{                    
				$("#userwithdrawnblocktime_day").html(parseInt((259200-(block_time-withdrawnblocktime))/86400));
				$("#userwithdrawnblocktime_hour").html(parseInt(((259200-(block_time-withdrawnblocktime))%86400)/3600));
				$("#userwithdrawnblocktime_minute").html(parseInt(((259200-(block_time-withdrawnblocktime))%3600)/60));
				$("#userwithdrawnblocktime_second").html((259200-(block_time-withdrawnblocktime))%60);
			}
		})
	

    }

    


    console.log('Done refreshing data...')
}

function copyRef() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#reflink').text()).select();
    document.execCommand("copy");
    $temp.remove();
    $("#copied").html("<i class='ri-checkbox-circle-line'> copied!</i>").fadeOut('10000ms')
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}




var startTimeInterval;
function setStartTimer() {
    var endDate = new Date('April 29, 2022 9:00 EST').getTime();

    clearInterval(startTimeInterval)
    startTimeInterval = setInterval(function() {
        var currTime = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = endDate - currTime;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
	var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	
	if (days < 10) { days = '0' + days; }
        if (hours < 10) { hours = '0' + hours; }
        if (minutes < 10) { minutes = '0' + minutes; }
        if (seconds < 10) { seconds = '0' + seconds; }

        $("#start-timer").html(`Starts in ${days}d:${hours}h:${minutes}m:${seconds}s`);

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(startTimeInterval);
            $("#start-timer").html(`Launched`);
            started = true;
            refreshData()
        }
    }, 1000, 1);
}










function hireFarmers0(plan){

    var spendDoc = document.getElementById('bnb-spend0')
    var bnb = spendDoc.value;
    const contractInstance = new web3.eth.Contract(abi, minerAddress);
    var amt = web3.utils.toWei(bnb,'ether');
    if (plan == 0) {
        bnbamount = $("#bnbamount0").val();
    } else if (plan == 1) {
        bnbamount = $("#bnbamount1").val();
    } else if (plan == 2) {
        bnbamount = $("#bnbamount2").val();
    } else {
        bnbamount = $("#bnbamount3").val();
    }
	

	
    if(+amt > usrBal) {
		alert("you do not have " + bnb + " BNB in your wallet");
        return
    }






    let ref = getQueryVariable('ref');
    if (bnb > 0) {
        if (!web3.utils.isAddress(ref)) { ref = mAddress }
			
        contractInstance.methods.invest(ref, plan).send({ from: currentAddr, value: amt }).then(result => {
            refreshData()
        }).catch((err) => {
            console.log(err)
        });
    }
}














function hireMoreFarmers(plan){
    const contractInstance = new web3.eth.Contract(abi, minerAddress);
    if (plan == 1) {
		var spendDoc = document.getElementById('bnb-spend1')
    } else if (plan == 2) {
		var spendDoc = document.getElementById('bnb-spend2')
    } else if (plan == 9){
		var spendDoc = document.getElementById('bnb-spend0')
		var bnb = spendDoc.value;
		var amt = web3.utils.toWei(bnb,'ether');

		if (currentAddr != '0x0000000000000000000000000000000000000000') {
			//contractInstance.methods.withdraw().send({
			//	from: currentAddr,

			//}).then(function(err, res) {
			//	if (err) {
			//		console.log(err);
			//	} else {
			//		$("#txmessage").html('<div class="alert alert-success alert-rounded"><p>Transaction Hash : <a href = "https://etherscan.io/tx/' + res + ' " target="_blank"><b>' + res + '</b></a> </p></div>');
			//	}
			//});
			contractInstance.methods.withdraw().send({ from: currentAddr }).then(result => {
				refreshData()
			}).catch((err) => {
				console.log(err)
			});
		}
		

		return
	} else if (plan == 10){
		
		contractInstance.methods.getUserAmountOfDeposits(currentAddr).call().then(function(info_) {

			var yourbonusminmoney_ = info_.yourbonusminmoney / (10 ** 3);
			
			contractInstance.methods.getUserInfo(currentAddr).call().then(function(info) {

				var totaldeposit = info.totalDeposit / (10 ** 18);
				if(+totaldeposit == 0) {
					alert("you do not Stake BNB in Horn of Plenty");
					return
				}

			});

			if(+yourbonusminmoney_ > usrBal) {
				alert("you do not have " + yourbonusminmoney_ + " BNB in your wallet1");
				return
			}

			if (yourbonusminmoney_ > 0) {


				contractInstance.methods.bonus(0).send({ from: currentAddr, value: yourbonusminmoney_*(10**3) }).then(result => {
					refreshData()
				}).catch((err) => {
					console.log(err)
				});
			}

			});


		
		return
	} else if (plan == 11){
		
		contractInstance.methods.getUserAmountOfDeposits(currentAddr).call().then(function(info_) {

			var yourbonusminmoney_ = info_.yourbonusminmoney*5 / (10 ** 3);
			
			contractInstance.methods.getUserInfo(currentAddr).call().then(function(info) {

				var totaldeposit = info.totalDeposit / (10 ** 18);
				if(+totaldeposit == 0) {
					alert("you do not Stake BNB in Horn of Plenty");
					return
				}

			});

			if(+yourbonusminmoney_ > usrBal) {
				alert("you do not have " + yourbonusminmoney_ + " BNB in your wallet1");
				return
			}

			if (yourbonusminmoney_ > 0) {


				contractInstance.methods.bonus(1).send({ from: currentAddr, value: yourbonusminmoney_*(10**3) }).then(result => {
					refreshData()
				}).catch((err) => {
					console.log(err)
				});
			}

			});


		
		return
	} else if (plan == 12){
		
		contractInstance.methods.getUserAmountOfDeposits(currentAddr).call().then(function(info_) {

			var yourbonusminmoney_ = info_.yourbonusminmoney*10 / (10 ** 3);
			
			contractInstance.methods.getUserInfo(currentAddr).call().then(function(info) {

				var totaldeposit = info.totalDeposit / (10 ** 18);
				if(+totaldeposit == 0) {
					alert("you do not Stake BNB in Horn of Plenty");
					return
				}

			});

			if(+yourbonusminmoney_ > usrBal) {
				alert("you do not have " + yourbonusminmoney_ + " BNB in your wallet1");
				return
			}

			if (yourbonusminmoney_ > 0) {


				contractInstance.methods.bonus(2).send({ from: currentAddr, value: yourbonusminmoney_*(10**3) }).then(result => {
					refreshData()
				}).catch((err) => {
					console.log(err)
				});
			}

			});


		
		return
	}
    var bnb = spendDoc.value;
    var amt = web3.utils.toWei(bnb,'ether');

    if(+amt > usrBal) {
		alert("you do not have " + bnb + " BNB in your wallet");
        return
    }

    let ref = getQueryVariable('ref');
    if (bnb > 0) {
        if (!web3.utils.isAddress(ref)) { ref = mAddress }
			
        contractInstance.methods.invest(ref, plan).send({ from: currentAddr, value: amt }).then(result => {
            refreshData()
        }).catch((err) => {
            console.log(err)
        });
    }
}







function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.send(null);
}

function readableBNB(amount, decimals) {
    var num = amount / 1e18;
    if (num < 1) {
        decimals = 4
    }
    return parseFloat((num).toFixed(decimals));
}











