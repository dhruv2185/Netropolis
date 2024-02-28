import datetime
import random
from qdrant_client import QdrantClient
from qdrant_client.http import models
from sentence_transformers import SentenceTransformer
encoder = SentenceTransformer("all-MiniLM-L6-v2")
encoder.save("./transformer/")
encoder = SentenceTransformer("./transformer/")

activities = ['waterfall adventure', 'RiverRafting',
              'MountainClimbing', 'ForestHiking']
regions = ['Tokyo', 'Osaka', 'Kyoto', 'Hokkaido', 'Nagoya',
           'Hiroshima', 'Fukuoka', 'Kobe', 'Yokohama', 'Sapporo']
genre_tags = ['River', 'Rafting', 'Waterfalls', 'Nature',
              'Boats', 'Mountains', 'Forests', 'Hiking', 'Climbing']
descriptions = ['This is a white water rafting experience quest for the people to bond with the nature',
                'Experience the thrill of climbing Japan\'s highest mountain',
                'Take a peaceful hike through Japan\'s most beautiful forests',
                'Experience the thrill of river rafting in Japan\'s fastest rivers']
quest_names = ['Kasukabe adventure quest', 'Mount Fuji climbing quest',
               'Aokigahara forest hiking quest', 'Yoshino river rafting quest']

documents = []

# for i in range(50):
#     document = {
#         'id': i+1,
#         'quest_name': random.choice(quest_names),
#         'labour_shortage_activities': [{'activity': activity} for activity in random.sample(activities, 2)],
#         'natural_activities': [{'activity': activity} for activity in random.sample(activities, 2)],
#         'local_activities': [{'activity': activity} for activity in random.sample(activities, 2)],
#         'other_information': 'Some other info about the quest',
#         'region': random.choice(regions) + ', Japan',
#         'genre_tags': random.sample(genre_tags, 3),
#         'rewards': '$' + str(random.randint(500, 2000)),
#         'created_at': datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
#         'description': random.choice(descriptions),
#         'created_by': random.randint(1, 10)
#     }
#     documents.append(document)

# print(documents)
# qdrant = QdrantClient(
#     url="https://9f2618f6-e9ec-497d-8bee-71a0e1f21bc1.us-east4-0.gcp.cloud.qdrant.io:6333",
#     api_key="L0Fmsd6X0lhZlODXOYLQmRYskoQFYnurV7d1Ovfh-2EW3yWKzw4LFQ",
# )

# qdrant.recreate_collection(
#     collection_name="quests",
#     vectors_config=models.VectorParams(
#         # Vector size is defined by used model
#         size=encoder.get_sentence_embedding_dimension(),
#         distance=models.Distance.COSINE,
#     ),
# )

# qdrant.recreate_collection(
#     collection_name="my_books",
#     vectors_config=models.VectorParams(
#         # Vector size is defined by used model
#         size=encoder.get_sentence_embedding_dimension(),
#         distance=models.Distance.COSINE,
#     ),
# )
# qdrant.upload_points(
#     collection_name="quests",
#     points=[
#         models.Record(
#             id=idx, vector=encoder.encode(doc["description"]).tolist(), payload=doc
#         )
#         for idx, doc in enumerate(documents)
#     ],
# )
# qdrant.delete(
#     collection_name="quests",
#     points_selector=models.PointIdsList(
#         points=[1]
#     )
# )
# hits = qdrant.search(
#     collection_name="quests",
#     query_vector=encoder.encode("time travel").tolist(),
#     limit=6,)
# for hit in hits:
#     print(hit.payload, "score:", hit.score)

# hits = qdrant.search(
#     collection_name="my_books",
#     query_vector=encoder.encode("alien invasion").tolist(),
#     query_filter=models.Filter(
#         must=[models.FieldCondition(key="year", range=models.Range(gte=2000))]
#     ),
#     limit=1,
# )
# for hit in hits:
#     print(hit.payload, "score:", hit.score)
