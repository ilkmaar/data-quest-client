// composables/useWorldLinks.js
import { useStore } from 'vuex'
import { SignJWT } from 'jose'
import { FV_GAME_URL, BACKGROUND_IMAGE_URL, FV_JWT_KEY, USE_TOKENS } from '../config'

export function useWorldLinks() {
  const store = useStore()

  const getFVWorldId = (id) => {
    return id.replace('world_', '')
  }

  const getFVPlayerId = (id) => {
    return id.replace('player_', '')
  }

  const generateWorldLink = async (worldId, worldName, playerId, playerName) => {
    const payload = {
      world_id: getFVWorldId(worldId),
      player_id: getFVPlayerId(playerId),
      player_name: playerName,
    }

    let gameLink;

    if (USE_TOKENS) {
      const token = await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .sign(new TextEncoder().encode(FV_JWT_KEY))

      gameLink = `${FV_GAME_URL}?token=${token}`
    } else {
      const queryParams = new URLSearchParams(payload).toString()
      gameLink = `${FV_GAME_URL}?${queryParams}`
    }

    return {
      gameLink,
      worldName,
      backgroundImageUrl: BACKGROUND_IMAGE_URL,
    }
  }

  const getWorldLink = async (data) => {
    const { world_id, world_name, player_id, player_name } = data
    const link = await generateWorldLink(world_id, world_name, player_id, player_name)
    return link
  }

  return {
    getWorldLink,
  }
}