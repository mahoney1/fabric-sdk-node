/**
 * Copyright 2018 IBM All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const FabricConstants = require('fabric-client/lib/Constants');

const SingleQueryHandler = require('fabric-network/lib/impl/query/singlequeryhandler');
const RoundRobinQueryHandler = require('fabric-network/lib/impl/query/roundrobinqueryhandler');

function getOrganizationPeers(network) {
	return network.getChannel().getPeersForOrg();
}

function filterQueryablePeers(peers) {
	return peers.filter((peer) => peer.isInRole(FabricConstants.NetworkConfig.CHAINCODE_QUERY_ROLE));
}

function MSPID_SCOPE_SINGLE(network, options) {
	const orgPeers = getOrganizationPeers(network);
	const queryPeers = filterQueryablePeers(orgPeers);
	return new SingleQueryHandler(queryPeers);
}

function MSPID_SCOPE_ROUND_ROBIN(network, options) {
	const orgPeers = getOrganizationPeers(network);
	const queryPeers = filterQueryablePeers(orgPeers);
	return new RoundRobinQueryHandler(queryPeers);
}

/**
 * @typedef DefaultQueryHandlerStrategies
 * @memberof module:fabric-network
 * @property {function} MSPID_SCOPE_SINGLE Query any one of the event hubs for the connected organisation. Continue
 * to use the same event hub for all queries unless it fails.
 * @property {function} MSPID_SCOPE_ROUND_ROBIN Query any one of the event hubs for the connected organisation.
 * Use the next available peer for each successive query.
 */

module.exports = {
	MSPID_SCOPE_SINGLE,
	MSPID_SCOPE_ROUND_ROBIN
};
