import React from "react";

import PlayerDetail from "../player-info";
import playersList from "../../players.json";
export default function TeamSelection() {
	const [players] = React.useState([...playersList]);
	const [selectedPlayers, setSelectedPlayers] = React.useState([]);
	const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
	const [idx, setIdx] = React.useState(null);
	const [welcome, setWelcome] = React.useState(true);
const PlayerValidators = {
	isWicketKeeper: (player) => player.type === "WicketKeeper",
	isBatsman: (player) => player.type === "Batsman",
	isBowler: (player) => player.type === "Bowler",
	isAllRounder: (player) => player.type === "AllRounder",
}
	const addPlayer = (index) => {
		const selectedPlayer = players[index]
		if(selectedPlayers.length === 11){
alert('Only 11 players are allowed in a team')
		} else if(selectedPlayers.filter(player => PlayerValidators.isWicketKeeper(player)).length === 1 && PlayerValidators.isWicketKeeper(selectedPlayer)) {
			alert()
		}
		else if(selectedPlayers.filter(player => PlayerValidators.isBatsman(player)).length === 6 && PlayerValidators.isBatsman(selectedPlayer)){
			alert('Batsmen can not be more than 6')
		}
		else if(selectedPlayers.filter(player => PlayerValidators.isBowler(player)).length === 6 && PlayerValidators.isBowler(selectedPlayer)){
			alert('Bowlers can not be more than 6')
		}
		else if(selectedPlayers.filter(player => PlayerValidators.isAllRounder(player)).length  === 4 && PlayerValidators.isAllRounder(selectedPlayer)) {
alert('All Rounders can not be more than 4')
		}
		else {setSelectedPlayers(prev => [...prev,selectedPlayer])}
	};

	const removePlayer = (index) => {
		setSelectedPlayers(selectedPlayers.filter((el, i) => i !== index))
	};

	const showplayerDetailsCard = (i) => {
		setShowPlayerDetail(players[i])
		setIdx(i)
	};

	const closeCard = () => {
		setShowPlayerDetail(false)
	};

	const isSelected = (i) => {
		return selectedPlayers.indexOf(players[i]) > -1
	}

	return (
		<div className="mt-50 layout-column justify-content-center align-items-center">
			<div style={{ display: "flex", width: "80%" }}>
				{
					showPlayerDetail && (
<PlayerDetail
						player={showPlayerDetail}
						selectedPlayers={selectedPlayers}
						i={idx}
						close={() => closeCard()}
						index={1}
						addPlayer={(i) => addPlayer(i)}
					/>
					)
				}
					
				<div
					className="card outlined mt-0"
					style={{
						width: "50%",
						marginRight: "10px",
						overflow: "scroll",
						height: "80vh",
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: "center" }}>Available Players</h4>
						<table>
							<thead>
								<tr>
									<th
										data-testid="available-players-name"
									>
										Name
									</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="available-players-table-body">
									{welcome && <tr>
										<td data-testid="selection-rules" colSpan="3" className="card pb-20">
											<p data-testid="close-welcome" style={{textAlign:'right'}} onClick={()=>setWelcome(false)}>X</p>
											<h3 style={{ textAlign: "center" }}>
												<strong>Welcome to Team Selection</strong>
											</h3>
											11 players are required in a team <br />
											3-6 batsmen and bowlers are allowed in a team
											<br />
											Only 1 Wicket Keeper required in a team
											<br />
											1-4 All Rounders are allowed in a team
										</td>
									</tr>}
									{
										players.map((player,i) => (
<tr
											data-testid={`available-${player.name.split(" ").join("-")}-row`}
											key={i}
										>
											<td
												data-testid={`available-${player.name.split(" ").join("-")}-name`}
												onClick={() => showplayerDetailsCard(i)}
											>
												{player.name}
											</td>
											<td onClick={() => showplayerDetailsCard(i)}>
												{player.type}
											</td>
											<td>
												<button
													data-testid={`available-${player.name.split(" ").join("-")}-select`}
													onClick={() => addPlayer(i)}
													disabled={isSelected(i)}
													className="btn btn-primary text"
												>
													Select
												</button>
											</td>
										</tr>
										))
									}
										
							</tbody>
						</table>
					</div>
				</div>
				<div
					className="card outlined mt-0"
					style={{
						width: "50%",
						marginRight: "10px",
						overflow: "scroll",
						height: "80vh",
					}}
				>
					<div className="card-text">
						<h4 style={{ textAlign: "center" }}>Selected Players</h4>
						<table>
							<thead>
								<tr>
									<th>Name</th>
									<th>Role</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody data-testid="selected-players-table-body">
								{selectedPlayers.map((player, index) => {
									return (
										<tr
											data-testid={`selected-${player.name
												.split(" ")
												.join("-")}-row`}
											key={index}
										>
											<td>{player.name}</td>
											<td>{player.type}</td>
											<td>
												<button
													data-testid={`selected-${player.name
														.split(" ")
														.join("-")}-remove`}
													onClick={() => removePlayer(index)}
													className="btn danger text"
												>
													Remove
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
