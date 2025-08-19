# City-Resource-Distribution-Simulator

Algorithm

FUNCTION Allocate(demand, suppliers, channels, district):

    // Step 1: Find valid channels for this district
    validChannels ← FILTER channels WHERE district ∈ channel.districts

    IF validChannels is empty THEN
        RETURN {text: "No channel", unmet: demand}

    // Step 2: Find the bottleneck capacity of the available channels
    channelCap ← MIN(channel.rate FOR EACH channel IN validChannels)

    remaining ← demand
    allocationText ← ""

    // Step 3: Sort suppliers by cost (ascending)
    sortedSuppliers ← SORT suppliers BY cost

    // Step 4: Allocate supply greedily
    FOR each supplier IN sortedSuppliers:
        IF remaining ≤ 0 THEN
            BREAK

        supply ← MIN(remaining, supplier.capacity, channelCap)

        IF supply > 0 THEN
            allocationText ← allocationText + 
                             supplier.name + " via " + validChannels[0].name +
                             ": " + supply + " units; "
            remaining ← remaining - supply

    // Step 5: Handle unmet demand
    IF allocationText = "" THEN
        allocationText ← "Not Supplied"

    RETURN {text: allocationText, unmet: MAX(remaining, 0)}
