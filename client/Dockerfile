FROM node:20-slim as builder

WORKDIR /app
COPY package*.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

# https://nextjs.org/docs/messages/sharp-missing-in-production
RUN npm i sharp

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]

