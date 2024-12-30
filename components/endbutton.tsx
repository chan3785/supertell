{/* <button className='text-white'
          onClick={() => {
            if (currentPrice !== null) {
              writeContract({
                abi: PRED_ABI,
                address: ETHENA_FACTORY_ADDRESS,
                functionName: 'endGame',
                args: [
                  game.gameId,
                  Math.floor(currentPrice * 10 ** 18)
                ]
              });
            } else {
              console.log("Current price is not available yet");
            }
          }}
        >
          End
      </button> */}